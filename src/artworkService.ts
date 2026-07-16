import { GoogleGenAI, Type } from '@google/genai';
import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';
import { COMPACT_MOVIES } from './movies-data';

export interface ArtworkMapping {
  poster: string;
  backdrop: string;
  originalPoster?: string;
  originalBackdrop?: string;
  title: string;
}

export interface ArtworkCache {
  mappings: Record<string, ArtworkMapping>;
  syncStatus: 'idle' | 'syncing' | 'completed' | 'error';
  processedCount: number;
  totalCount: number;
}

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const ARTWORK_DIR = path.join(PUBLIC_DIR, 'artwork');
const POSTERS_DIR = path.join(ARTWORK_DIR, 'posters');
const BACKDROPS_DIR = path.join(ARTWORK_DIR, 'backdrops');
const CACHE_FILE = path.join(ARTWORK_DIR, 'cache.json');

// Ensure directories exist
function ensureDirectories() {
  [PUBLIC_DIR, ARTWORK_DIR, POSTERS_DIR, BACKDROPS_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Load current cache from disk
export function getArtworkCache(): ArtworkCache {
  ensureDirectories();
  if (fs.existsSync(CACHE_FILE)) {
    try {
      const data = fs.readFileSync(CACHE_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse artwork cache file, resetting cache:', e);
    }
  }

  const initialCache: ArtworkCache = {
    mappings: {},
    syncStatus: 'idle',
    processedCount: 0,
    totalCount: COMPACT_MOVIES.length,
  };
  saveArtworkCache(initialCache);
  return initialCache;
}

// Save current cache to disk
function saveArtworkCache(cache: ArtworkCache) {
  ensureDirectories();
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
}

// Helper: Download image from URL and save locally
async function downloadImage(url: string, destPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(destPath);
    const maxRedirects = 5;
    let redirectCount = 0;

    const request = (u: string) => {
      if (!u || !u.startsWith('http')) {
        file.close();
        fs.unlink(destPath, () => {});
        resolve(false);
        return;
      }

      const client = u.startsWith('https') ? https : http;
      client.get(u, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        },
        timeout: 15000
      }, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
          redirectCount++;
          if (redirectCount > maxRedirects) {
            file.close();
            fs.unlink(destPath, () => {});
            resolve(false);
            return;
          }
          const redirectUrl = response.headers.location;
          if (redirectUrl) {
            request(redirectUrl.startsWith('http') ? redirectUrl : new URL(redirectUrl, u).toString());
            return;
          }
        }

        if (response.statusCode !== 200) {
          file.close();
          fs.unlink(destPath, () => {});
          resolve(false);
          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      }).on('error', (err) => {
        console.error(`Download error for URL: ${u}`, err.message);
        file.close();
        fs.unlink(destPath, () => {});
        resolve(false);
      });
    };

    request(url);
  });
}

// Helper: Clean title for safe filenames
function getCleanFilename(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .trim();
}

let isSyncRunning = false;

// Helper: Normalize string for comparison
function cleanString(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Helper: Fetch a web page with redirects handled
function fetchPage(url: string, redirects = 0): Promise<{ html: string, finalUrl: string }> {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      timeout: 10000
    }, (res) => {
      if ((res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) && res.headers.location) {
        if (redirects > 5) {
          reject(new Error('Too many redirects'));
          return;
        }
        let redirUrl = res.headers.location;
        if (!redirUrl.startsWith('http')) {
          redirUrl = new URL(redirUrl, url).toString();
        }
        resolve(fetchPage(redirUrl, redirects + 1));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ html: data, finalUrl: url }));
    }).on('error', reject);
  });
}

// Helper: Scrape artwork from TMDB
async function scrapeArtworkFromTMDB(title: string, isSeries = false): Promise<{ posterUrl: string, backdropUrl: string } | null> {
  try {
    const searchUrl = `https://www.themoviedb.org/search?query=${encodeURIComponent(title)}`;
    const searchRes = await fetchPage(searchUrl);
    
    // Match hrefs like /movie/157336 or /movie/157336-interstellar
    const regex = /href=\"\/(movie|tv)\/(\d+)(-[a-z0-9-]+)?\"/g;
    let match;
    const matches: Array<{ type: string, id: string, slug: string }> = [];
    while ((match = regex.exec(searchRes.html)) !== null) {
      matches.push({ type: match[1], id: match[2], slug: match[3] || '' });
    }
    
    if (matches.length === 0) {
      return null;
    }
    
    // Score matches to find the best, most confident match
    const targetClean = cleanString(title);
    let bestMatch: any = null;
    let bestScore = 0;
    
    for (const m of matches) {
      let score = 0.1;
      // Prioritize correct media type
      if (isSeries && m.type === 'tv') score += 0.2;
      if (!isSeries && m.type === 'movie') score += 0.2;
      
      const slugClean = cleanString(m.slug);
      if (slugClean === targetClean) {
        score += 0.7;
      } else if (slugClean.includes(targetClean) || targetClean.includes(slugClean)) {
        score += 0.5;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = m;
      }
    }
    
    // Skip if confidence score is low (Requirement 7: Skip movies that cannot be matched with confidence)
    if (bestScore < 0.6) {
      return null;
    }
    
    // Fetch detail page
    const detailUrl = `https://www.themoviedb.org/${bestMatch.type}/${bestMatch.id}`;
    const detailRes = await fetchPage(detailUrl);
    
    // Extract og:images
    const ogImageRegex = /<meta property=\"og:image\" content=\"([^\"]+)\"/g;
    let imgMatch;
    const images: string[] = [];
    while ((imgMatch = ogImageRegex.exec(detailRes.html)) !== null) {
      images.push(imgMatch[1]);
    }
    
    if (images.length >= 2) {
      // Replace low-res sizes with high-res ones
      const posterUrl = images[0].replace('/w500/', '/w780/');
      const backdropUrl = images[1].replace('/w780/', '/w1280/');
      return { posterUrl, backdropUrl };
    } else if (images.length === 1) {
      const img = images[0];
      // If only one image, use it for both or adapt
      if (img.includes('poster') || img.includes('/w500/')) {
        return { posterUrl: img.replace('/w500/', '/w780/'), backdropUrl: img.replace('/w500/', '/w1280/') };
      } else {
        return { posterUrl: img.replace('/w780/', '/w780/'), backdropUrl: img.replace('/w780/', '/w1280/') };
      }
    }
  } catch (err: any) {
    console.error(`[TMDB Scraper] Error scraping for "${title}":`, err.message);
  }
  return null;
}

// Core function: Sync movie artworks
export async function syncArtwork(force = false) {
  if (isSyncRunning) {
    console.log('[Artwork Service] Sync already in progress.');
    return;
  }

  isSyncRunning = true;
  const cache = getArtworkCache();
  cache.syncStatus = 'syncing';
  cache.totalCount = COMPACT_MOVIES.length;
  saveArtworkCache(cache);

  console.log(`[Artwork Service] Starting fully automatic artwork scraper for ${COMPACT_MOVIES.length} items...`);

  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '') {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('[Artwork Service] GEMINI_API_KEY detected. Gemini Search Grounding will be used as a fallback.');
  }

  try {
    let processed = 0;
    for (const movie of COMPACT_MOVIES) {
      const cleanTitle = movie.title.trim();
      const fileSafeName = getCleanFilename(cleanTitle);

      const posterLocalPath = path.join(POSTERS_DIR, `${fileSafeName}.jpg`);
      const backdropLocalPath = path.join(BACKDROPS_DIR, `${fileSafeName}.jpg`);

      const posterUrlWeb = `/artwork/posters/${fileSafeName}.jpg`;
      const backdropUrlWeb = `/artwork/backdrops/${fileSafeName}.jpg`;

      const isCached = cache.mappings[cleanTitle] && 
                       fs.existsSync(posterLocalPath) && 
                       fs.existsSync(backdropLocalPath);

      if (isCached && !force) {
        processed++;
        cache.processedCount = processed;
        saveArtworkCache(cache);
        continue;
      }

      console.log(`[Artwork Service] Processing: "${cleanTitle}" (${movie.year})...`);
      let artworkResult: { posterUrl: string, backdropUrl: string } | null = null;

      // 1. Primary Engine: Direct TMDB Scraping (highly reliable, fast, zero cost, no key needed)
      const isSeries = movie.type === 'series';
      artworkResult = await scrapeArtworkFromTMDB(cleanTitle, isSeries);

      // 2. Secondary Engine: Gemini Search Grounding Fallback (if key is available)
      if (!artworkResult && ai) {
        console.log(`[Artwork Service] TMDB scraper missed for "${cleanTitle}". Falling back to Gemini Search Grounding...`);
        try {
          const prompt = `Perform a Google Search to discover the exact official TMDB (The Movie Database) or IMDb high-quality poster and landscape backdrop image URLs for the movie or TV series: "${cleanTitle}" released in year "${movie.year}".
If the title indicates a future movie (e.g., year 2026), look for its official poster/backdrop or official announcement press kit artwork.
Avoid fan-made, cropped, low-quality, or AI-generated posters/images.
Ensure the backdrop is a high-resolution landscape (horizontal widescreen) aspect ratio.
Ensure the poster is a high-resolution portrait (vertical) aspect ratio.
If you are confident in your matches, return the exact image URLs. If you cannot find a confident official match, set confidence below 0.75.

Return the result as a JSON object matching this schema:
{
  "posterUrl": "https://image.tmdb.org/t/p/w780/...", 
  "backdropUrl": "https://image.tmdb.org/t/p/w1280/...", 
  "confidence": 0.95 
}`;

          const result = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: prompt,
            config: {
              tools: [{ googleSearch: {} }],
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  posterUrl: { type: Type.STRING },
                  backdropUrl: { type: Type.STRING },
                  confidence: { type: Type.NUMBER },
                },
                required: ['posterUrl', 'backdropUrl', 'confidence'],
              },
            },
          });

          const textResponse = result.text;
          if (textResponse) {
            const parsed = JSON.parse(textResponse.trim());
            const confidence = parsed.confidence || 0;
            if (confidence >= 0.70 && parsed.posterUrl && parsed.backdropUrl) {
              artworkResult = {
                posterUrl: parsed.posterUrl,
                backdropUrl: parsed.backdropUrl
              };
            }
          }
        } catch (err: any) {
          console.error(`[Artwork Service] Gemini fallback failed for "${cleanTitle}":`, err.message || err);
        }
      }

      // Download and save if we got a valid artwork result
      if (artworkResult) {
        console.log(`[Artwork Service] Downloading official artwork for "${cleanTitle}"...`);
        const posterOk = await downloadImage(artworkResult.posterUrl, posterLocalPath);
        const backdropOk = await downloadImage(artworkResult.backdropUrl, backdropLocalPath);

        if (posterOk && backdropOk) {
          cache.mappings[cleanTitle] = {
            title: cleanTitle,
            poster: posterUrlWeb,
            backdrop: backdropUrlWeb,
            originalPoster: artworkResult.posterUrl,
            originalBackdrop: artworkResult.backdropUrl
          };
          console.log(`[Artwork Service] Successfully cached artwork for: "${cleanTitle}"`);
        } else {
          console.warn(`[Artwork Service] Download failed for "${cleanTitle}" files.`);
        }
      } else {
        console.log(`[Artwork Service] Skipped: "${cleanTitle}" (Confidence threshold not met)`);
      }

      processed++;
      cache.processedCount = processed;
      saveArtworkCache(cache);

      // Add a small delay between requests to be gentle on server limits
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    cache.syncStatus = 'completed';
    saveArtworkCache(cache);
    console.log('[Artwork Service] Sync complete! All available official movie artworks cached.');
  } catch (error) {
    console.error('[Artwork Service] Fatal error during sync:', error);
    cache.syncStatus = 'error';
    saveArtworkCache(cache);
  } finally {
    isSyncRunning = false;
  }
}
