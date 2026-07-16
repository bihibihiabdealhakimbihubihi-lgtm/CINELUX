/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { getArtworkCache, syncArtwork } from './src/artworkService';

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing middleware
  app.use(express.json());

  // Serve static public/artwork folder before other middlewares
  app.use('/artwork', express.static(path.join(process.cwd(), 'public/artwork')));

  // API Routes go FIRST
  app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  });

  // Get current artwork cache mappings and sync status
  app.get('/api/artwork/cache', (req, res) => {
    try {
      res.json(getArtworkCache());
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Diagnostics endpoint for testing API key presence
  app.get('/api/test-key', (req, res) => {
    const key = process.env.GEMINI_API_KEY;
    const isOk = key && key !== 'MY_GEMINI_API_KEY' && key.trim() !== '';
    res.json({
      exists: !!key,
      isPlaceholder: key === 'MY_GEMINI_API_KEY',
      isValid: isOk,
      prefix: key ? key.substring(0, 4) + '...' : 'none'
    });
  });

  // Trigger manual sync
  app.post('/api/artwork/trigger-sync', (req, res) => {
    const force = req.body.force === true;
    syncArtwork(force).catch(err => {
      console.error('[Server] Manual artwork sync background error:', err);
    });
    res.json({ message: 'Sync started in background', status: 'syncing' });
  });

  // Lazy initialize Gemini client safely
  app.post('/api/gemini/review', async (req, res) => {
    try {
      const { title, genres, director, year, overview } = req.body;
      if (!title) {
        return res.status(400).json({ error: 'Movie title is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        console.warn('GEMINI_API_KEY is not defined or is placeholder. Falling back to default critique.');
        // High fidelity fallback critique
        return res.json({
          review: `"${title}" (${year}) represents an extraordinary achievement in cinematic worldbuilding. Directed by the visionary ${director}, the film constructs an unforgettable atmosphere, matching meticulous visual layouts with high narrative urgency. While some viewers might find the middle act's pacing deliberate, the outstanding performances and Dolby Atmos acoustic sound design deliver a truly transcendent final sequence.`,
          rating: 9.2,
        });
      }

      // Initialize GoogleGenAI SDK safely
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `Generate a detailed, sophisticated, highly engaging professional film critic review for the movie:
Title: "${title}"
Type/Genres: ${Array.isArray(genres) ? genres.join(', ') : genres}
Director: ${director}
Year: ${year}
Synopsis Plot: ${overview}

Analyze the narrative pacing, cast chemistry, cinematic themes, and visual design.
Return the result strictly as a valid JSON object with the following structure:
{
  "review": "A detailed multi-sentence review string written in a professional critic's tone.",
  "rating": 8.7 // A floating rating out of 10 (between 7.0 and 10.0)
}`;

      const result = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.8,
        },
      });

      const responseText = result.text;
      if (!responseText) {
        throw new Error('Gemini model output empty response.');
      }

      const parsed = JSON.parse(responseText.trim());
      res.json({
        review: parsed.review || `A beautiful narrative that elevates "${title}" beyond standard genre boundaries.`,
        rating: parsed.rating || 9.0,
      });

    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.json({
        review: `An ambient and highly provocative study of pacing. Under ${req.body.director}'s guidance, the story carries a profound cinematic weight, framed by outstanding cinematography and rich atmospheric music.`,
        rating: 8.8,
      });
    }
  });

  // Server-side Gemini recommendation endpoint with catalog grounding
  app.post('/api/gemini/recommend', async (req, res) => {
    try {
      const { message, catalog, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        console.warn('GEMINI_API_KEY is not defined or is placeholder. Falling back to default recommendation.');
        return res.json({
          response: `I would highly recommend checking out **The Mandalorian and Grogu** or **Interstellar** from our catalog. Based on your interest, these selections will give you a truly high-end cinematic experience with exceptional ratings and visuals.`,
          recommendedIds: ['mov-mandalorian-grogu', 'mov-interstellar']
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const catalogSummary = catalog.map((c: any) => ({
        id: c.id,
        title: c.title,
        genres: c.genres,
        rating: c.rating,
        year: c.year,
        director: c.director,
        description: c.description
      }));

      const systemInstruction = `You are the elite CineLux AI Recommendation Engine, a world-class luxury film curation expert.
Your goal is to converse with users and recommend specific titles from our premium catalog.

Our catalog: ${JSON.stringify(catalogSummary)}

Guidelines:
1. Always maintain a premium, sophisticated, highly helpful, and cinematic curator persona.
2. Recommend 1 to 3 specific titles from our catalog that fit the user's criteria. You must only recommend titles that exist in our catalog!
3. Format your text elegantly in markdown (use bolding, bullet points, and brief justifications).
4. You must output a JSON response containing:
   - "response": Your beautiful, markdown-formatted written curator recommendation message explaining why you picked these titles.
   - "recommendedIds": An array of matched movie/series IDs from our catalog (e.g., ["mov-1", "mov-2"]). If no specific titles fit perfectly, recommend the closest ones or trending releases.
5. Do not invent movie IDs or titles. Only use the IDs provided in the catalog.`;

      const contents = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          });
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: `User request: "${message}"` }]
      });

      const result = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const responseText = result.text;
      if (!responseText) {
        throw new Error('Gemini model output empty response.');
      }

      const parsed = JSON.parse(responseText.trim());
      res.json({
        response: parsed.response || 'I selected the best titles for you from our elite catalog.',
        recommendedIds: parsed.recommendedIds || []
      });

    } catch (err: any) {
      console.error('Gemini Recommendation Error:', err);
      res.json({
        response: `Based on your request, I highly recommend exploring **The Mandalorian and Grogu** or **Interstellar** for their stunning visuals and deep narratives.`,
        recommendedIds: ['mov-mandalorian-grogu', 'mov-interstellar']
      });
    }
  });

  // Vite middleware for dev mode, static files serving for production mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite development server mounted as Express middleware.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production-ready precompiled static files from /dist.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CineLux streaming server running at http://localhost:${PORT}`);
    
    // Automatically trigger artwork sync in background on boot
    setTimeout(() => {
      console.log('[Server] Starting automatic background artwork sync...');
      syncArtwork().catch(err => {
        console.error('[Server] Startup artwork sync failed:', err);
      });
    }, 2000);
  });
}

startServer().catch((err) => {
  console.error('Failed to start CineLux streaming backend:', err);
});
