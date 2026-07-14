export interface CompactMovie {
  id: string;
  tmdbId: number;
  title: string;
  originalTitle?: string;
  type?: 'movie' | 'series';
  year: number | string;
  rating: number;
  genres: string[];
  overview: string;
  poster: string;
  backdrop: string;
  director: string;
  cast: string[];
  runtime: number;
  isTrending?: boolean;
  isPopular?: boolean;
  isComingSoon?: boolean;
  isEditorPick?: boolean;
  isFeatured?: boolean;
  releaseDate: string;
  seasonsCount?: number;
}

export const COMPACT_MOVIES: CompactMovie[] = [
  {
    "id": "mov-interstellar",
    "tmdbId": 20001,
    "title": "Interstellar",
    "year": 2014,
    "rating": 8.7,
    "genres": [
      "Sci-Fi",
      "Adventure",
      "Drama"
    ],
    "overview": "A team of explorers travel through a newly discovered wormhole in space in an attempt to ensure humanity's survival on a dying Earth.",
    "poster": "https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg",
    "backdrop": "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1200&auto=format&fit=crop",
    "director": "Christopher Nolan",
    "cast": [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Jessica Chastain"
    ],
    "runtime": 169,
    "isPopular": true,
    "isEditorPick": true,
    "isFeatured": true,
    "releaseDate": "November 5, 2014"
  },
  {
    "id": "mov-inception",
    "tmdbId": 20002,
    "title": "Inception",
    "year": 2010,
    "rating": 8.8,
    "genres": [
      "Sci-Fi",
      "Action",
      "Thriller"
    ],
    "overview": "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    "poster": "https://image.tmdb.org/t/p/w500/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
    "backdrop": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
    "director": "Christopher Nolan",
    "cast": [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Elliot Page"
    ],
    "runtime": 148,
    "isPopular": true,
    "isFeatured": true,
    "releaseDate": "July 15, 2010"
  },
  {
    "id": "mov-mandalorian-grogu",
    "tmdbId": 20003,
    "title": "The Mandalorian and Grogu",
    "year": 2026,
    "rating": 8.5,
    "genres": [
      "Sci-Fi",
      "Action",
      "Adventure"
    ],
    "overview": "The legendary Mandalorian bounty hunter Din Djarin and his apprentice Grogu embark on a high-stakes cinema odyssey across a changing galaxy.",
    "poster": "https://image.tmdb.org/t/p/w500/idAbBq8IGQzzYvb4mUUX7kQGyLy.jpg",
    "backdrop": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    "director": "Jon Favreau",
    "cast": [
      "Pedro Pascal",
      "Katee Sackhoff",
      "Carl Weathers"
    ],
    "runtime": 120,
    "isTrending": true,
    "isFeatured": true,
    "isPopular": true,
    "releaseDate": "May 20, 2026"
  },
  {
    "id": "mov-avatar-fire-ash",
    "tmdbId": 20004,
    "title": "Avatar: Fire and Ash",
    "year": 2025,
    "rating": 8.4,
    "genres": [
      "Sci-Fi",
      "Action",
      "Adventure",
      "Fantasy"
    ],
    "overview": "James Cameron takes audiences back to Pandora to explore the aggressive and volcanic Ash People, a new warrior clan of Na'vi.",
    "poster": "https://image.tmdb.org/t/p/w500/uAnLeakkcgsp7KahiQ43T44Wkdg.jpg",
    "backdrop": "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?q=80&w=1200&auto=format&fit=crop",
    "director": "James Cameron",
    "cast": [
      "Sam Worthington",
      "Zoe Saldana",
      "Sigourney Weaver"
    ],
    "runtime": 180,
    "isComingSoon": true,
    "isTrending": true,
    "isFeatured": true,
    "releaseDate": "December 17, 2025"
  },
  {
    "id": "mov-zootopia-2",
    "tmdbId": 20005,
    "title": "Zootopia 2",
    "year": 2025,
    "rating": 8,
    "genres": [
      "Animation",
      "Family",
      "Comedy",
      "Adventure"
    ],
    "overview": "Judy Hopps and Nick Wilde return to solve a brand new case in the concrete jungle of animal district societies, hunting down a mysterious reptile.",
    "poster": "https://image.tmdb.org/t/p/w500/5tcgDTETcdK1s8nd91WU4sP8Lys.jpg",
    "backdrop": "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=1200&auto=format&fit=crop",
    "director": "Byron Howard",
    "cast": [
      "Ginnifer Goodwin",
      "Jason Bateman",
      "Ke Huy Quan"
    ],
    "runtime": 105,
    "isComingSoon": true,
    "isTrending": true,
    "isFeatured": true,
    "releaseDate": "November 26, 2025"
  },
  {
    "id": "mov-project-hail-mary",
    "tmdbId": 20006,
    "title": "Project Hail Mary",
    "year": 2026,
    "rating": 8.6,
    "genres": [
      "Sci-Fi",
      "Adventure",
      "Drama"
    ],
    "overview": "A lone astronaut must save Earth from an extinction-level solar crisis using his scientific genius and the help of an unexpected alien companion.",
    "poster": "https://image.tmdb.org/t/p/w500/mnyiHOn95liBebKC2AwwPbvYUBQ.jpg",
    "backdrop": "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1200&auto=format&fit=crop",
    "director": "Phil Lord",
    "cast": [
      "Ryan Gosling",
      "Sandra Hüller"
    ],
    "runtime": 135,
    "isComingSoon": true,
    "isTrending": true,
    "isFeatured": true,
    "releaseDate": "March 15, 2026"
  },
  {
    "id": "mov-demon-slayer-castle",
    "tmdbId": 20007,
    "title": "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
    "year": 2025,
    "rating": 8.9,
    "genres": [
      "Animation",
      "Action",
      "Fantasy"
    ],
    "overview": "The grand cinematic movie trilogy adapting the final battle of the Demon Slayer Corps within Muzan's mind-bending and gravity-defying Infinity Castle.",
    "poster": "https://image.tmdb.org/t/p/w500/yWiKatmfohZRG5P1IMzvuMRxlR8.jpg",
    "backdrop": "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1200&auto=format&fit=crop",
    "director": "Haruo Sotozaki",
    "cast": [
      "Natsuki Hanae",
      "Akari Kito",
      "Yoshitsugu Matsuoka"
    ],
    "runtime": 120,
    "isComingSoon": true,
    "isTrending": true,
    "isFeatured": true,
    "releaseDate": "July 18, 2025"
  },
  {
    "id": "mov-supergirl",
    "tmdbId": 20008,
    "title": "Supergirl",
    "year": 2015,
    "rating": 7.9,
    "genres": [
      "Action",
      "Adventure",
      "Sci-Fi"
    ],
    "overview": "Supergirl: Woman of Tomorrow follows Kara Zor-El, who is raised on a harsh remnant of Krypton, witnessing its absolute destruction before landing on Earth.",
    "poster": "https://image.tmdb.org/t/p/w500/cFO65xb0xiXKqk5BmgHawCXB1i0.jpg",
    "backdrop": "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1200&auto=format&fit=crop",
    "director": "Craig Gillespie",
    "cast": [
      "Milly Alcock",
      "Eve Ridley"
    ],
    "runtime": 125,
    "isComingSoon": true,
    "isFeatured": true,
    "releaseDate": "October 26, 2015"
  },
  {
    "id": "mov-shawshank",
    "tmdbId": 20009,
    "title": "The Shawshank Redemption",
    "year": 1994,
    "rating": 9.3,
    "genres": [
      "Drama"
    ],
    "overview": "Over the course of several years, two convicts form a deep friendship, seeking consolation and, eventually, redemption through basic human compassion.",
    "poster": "https://image.tmdb.org/t/p/w500/aAdnwqwkKX5PPcr8EdtaiA8AZVl.jpg",
    "backdrop": "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    "director": "Frank Darabont",
    "cast": [
      "Tim Robbins",
      "Morgan Freeman",
      "Bob Gunton"
    ],
    "runtime": 142,
    "isPopular": true,
    "isEditorPick": true,
    "isFeatured": true,
    "releaseDate": "September 23, 1994"
  },
  {
    "id": "mov-get-out",
    "tmdbId": 20010,
    "title": "The Get Out",
    "year": 2026,
    "rating": 7.8,
    "genres": [
      "Horror",
      "Mystery",
      "Thriller"
    ],
    "overview": "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception eventually reaches a boiling point.",
    "poster": "https://image.tmdb.org/t/p/w500/zlkeH0s7dDxcnuPcHBqAyXFUxqN.jpg",
    "backdrop": "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=1200&auto=format&fit=crop",
    "director": "Jordan Peele",
    "cast": [
      "Daniel Kaluuya",
      "Allison Williams",
      "Bradley Whitford"
    ],
    "runtime": 104,
    "isPopular": true,
    "isFeatured": true,
    "releaseDate": "June 18, 2026"
  },
  {
    "id": "mov-obsession",
    "tmdbId": 20011,
    "title": "Obsession",
    "year": 2026,
    "rating": 7.2,
    "genres": [
      "Thriller",
      "Drama",
      "Romance"
    ],
    "overview": "A respected London surgeon embarks on an intense, secret affair with his son's fiancée, threatening to collapse his stable life.",
    "poster": "https://image.tmdb.org/t/p/w500/kYAKhRyRcoijGoUUETVTQm8xqzj.jpg",
    "backdrop": "https://images.unsplash.com/photo-1501901904253-06a645ff125b?q=80&w=1200&auto=format&fit=crop",
    "director": "Glenn Leyburn",
    "cast": [
      "Richard Armitage",
      "Charlie Murphy",
      "Indira Varma"
    ],
    "runtime": 160,
    "isPopular": true,
    "releaseDate": "May 13, 2026"
  },
  {
    "id": "mov-toy-story-5",
    "tmdbId": 20012,
    "title": "Toy Story 5",
    "year": "TBA",
    "rating": 8.2,
    "genres": [
      "Animation",
      "Family",
      "Comedy",
      "Adventure"
    ],
    "overview": "Buzz, Woody, and the gang face an all-new threat to play: electronic devices and digital screens that are capturing modern children's attention.",
    "poster": "https://image.tmdb.org/t/p/w500/tFoE3hYk21Qkru7WP2EMmzvxFmY.jpg",
    "backdrop": "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?q=80&w=1200&auto=format&fit=crop",
    "director": "Andrew Stanton",
    "cast": [
      "Tom Hanks",
      "Tim Allen",
      "Joan Cusack"
    ],
    "runtime": 100,
    "isComingSoon": true,
    "releaseDate": "Toy Story 5"
  },
  {
    "id": "mov-disclosure-day",
    "tmdbId": 20013,
    "title": "Disclosure Day",
    "year": 2026,
    "rating": 8.3,
    "genres": [
      "Sci-Fi",
      "Thriller",
      "Mystery"
    ],
    "overview": "Global panic rises when governments of the world are forced to release all classified records regarding extraterrestrial contacts.",
    "poster": "https://image.tmdb.org/t/p/w500/30RwADJimZ3fe9HV6jHzsAMuMqL.jpg",
    "backdrop": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    "director": "Denis Villeneuve",
    "cast": [
      "Jessica Chastain",
      "Oscar Isaac"
    ],
    "runtime": 130,
    "isComingSoon": true,
    "releaseDate": "June 10, 2026"
  },
  {
    "id": "mov-backrooms",
    "tmdbId": 20014,
    "title": "Backrooms",
    "year": 2026,
    "rating": 8.1,
    "genres": [
      "Horror",
      "Mystery",
      "Thriller"
    ],
    "overview": "A young cameraman accidentally slips into an infinite, yellow-tinted maze of empty office rooms with a lurking entity.",
    "poster": "https://image.tmdb.org/t/p/w500/rhGx6E3qRNMgj3i5su2oukNHwIQ.jpg",
    "backdrop": "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=1200&auto=format&fit=crop",
    "director": "Kane Parsons",
    "cast": [
      "Kane Parsons",
      "A24 Talent"
    ],
    "runtime": 95,
    "isComingSoon": true,
    "releaseDate": "June 17, 2026"
  },
  {
    "id": "mov-scary-movie",
    "tmdbId": 20015,
    "title": "Scary Movie",
    "year": 2026,
    "rating": 6.3,
    "genres": [
      "Comedy",
      "Horror"
    ],
    "overview": "A group of familiar-looking teenagers find themselves being stalked by a recognizable masked killer in this hilarious genre parody.",
    "poster": "https://image.tmdb.org/t/p/w500/frZLn0bjQgnSTtuDFPo3oo7b0Nr.jpg",
    "backdrop": "https://images.unsplash.com/photo-1513797839453-8d1e735369ca?q=80&w=1200&auto=format&fit=crop",
    "director": "Keenen Ivory Wayans",
    "cast": [
      "Anna Faris",
      "Regina Hall",
      "Marlon Wayans"
    ],
    "runtime": 88,
    "isPopular": true,
    "releaseDate": "June 3, 2026"
  },
  {
    "id": "mov-prada-2",
    "tmdbId": 20016,
    "title": "The Devil Wears Prada 2",
    "year": 2026,
    "rating": 7.7,
    "genres": [
      "Drama",
      "Comedy"
    ],
    "overview": "The legendary editor Miranda Priestly faces the decline of traditional print magazines and is forced to confront her former assistant.",
    "poster": "https://image.tmdb.org/t/p/w500/5qd18QHsNurNAil2QCeIePXAd0W.jpg",
    "backdrop": "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=1200&auto=format&fit=crop",
    "director": "David Frankel",
    "cast": [
      "Meryl Streep",
      "Emily Blunt",
      "Anne Hathaway"
    ],
    "runtime": 115,
    "isComingSoon": true,
    "releaseDate": "April 29, 2026"
  },
  {
    "id": "mov-the-furious",
    "tmdbId": 20017,
    "title": "The Furious",
    "year": 2026,
    "rating": 8.1,
    "genres": [
      "Action",
      "Thriller"
    ],
    "overview": "A high-octane martial arts thriller where a retired operative must assemble his old crew to take down a corrupt syndicate.",
    "poster": "https://image.tmdb.org/t/p/w500/9DoDjn3HKXmn2zIsnATVEePuzFT.jpg",
    "backdrop": "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?q=80&w=1200&auto=format&fit=crop",
    "director": "Kenji Tanigaki",
    "cast": [
      "Xie Miao",
      "Joe Taslim"
    ],
    "runtime": 112,
    "isTrending": true,
    "releaseDate": "June 10, 2026"
  },
  {
    "id": "mov-citizen-vigilante",
    "tmdbId": 20018,
    "title": "Citizen Vigilante",
    "year": 2026,
    "rating": 7.9,
    "genres": [
      "Action",
      "Crime",
      "Thriller"
    ],
    "overview": "An ordinary citizen becomes an underground symbol of justice when he starts targeting untouchable white-collar criminals.",
    "poster": "https://image.tmdb.org/t/p/w500/6LmJD3Wohe0g4U62wgi7RyJqfE4.jpg",
    "backdrop": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
    "director": "Chad Stahelski",
    "cast": [
      "Keanu Reeves",
      "Laurence Fishburne"
    ],
    "runtime": 124,
    "isComingSoon": true,
    "releaseDate": "June 19, 2026"
  },
  {
    "id": "mov-vixen",
    "tmdbId": 20019,
    "title": "Vixen!",
    "year": 1968,
    "rating": 6,
    "genres": [
      "Drama",
      "Thriller"
    ],
    "overview": "A bush pilot's wife in the Canadian wilderness passes her time with various houseguests and local tourists.",
    "poster": "https://image.tmdb.org/t/p/w500/9KMZWDA3xTrlgrScqdMisINQmsh.jpg",
    "backdrop": "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1200&auto=format&fit=crop",
    "director": "Russ Meyer",
    "cast": [
      "Erica Gavin",
      "Garth Pillsbury"
    ],
    "runtime": 71,
    "isPopular": true,
    "releaseDate": "October 15, 1968"
  },
  {
    "id": "mov-heart-broken",
    "tmdbId": 20020,
    "title": "Your Heart Will Be Broken",
    "year": 2026,
    "rating": 8.2,
    "genres": [
      "Romance",
      "Drama"
    ],
    "overview": "A tender, deeply moving story of two kindred souls who meet under fleeting circumstances in modern Paris.",
    "poster": "https://image.tmdb.org/t/p/w500/7wIBfBl2gejt6xHxNSK0reVIm7E.jpg",
    "backdrop": "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop",
    "director": "Celine Sciamma",
    "cast": [
      "Adèle Haenel",
      "Noémie Merlant"
    ],
    "runtime": 110,
    "isComingSoon": true,
    "releaseDate": "March 26, 2026"
  },
  {
    "id": "mov-passenger",
    "tmdbId": 20021,
    "title": "Passenger",
    "year": 2026,
    "rating": 7,
    "genres": [
      "Sci-Fi",
      "Drama",
      "Thriller"
    ],
    "overview": "A spacecraft traveling to a distant colony planet has a sleeper pod malfunction, waking up two passengers ninety years too early.",
    "poster": "https://image.tmdb.org/t/p/w500/c3A6XmVPEPd5iioYtCWQRSnQguc.jpg",
    "backdrop": "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1200&auto=format&fit=crop",
    "director": "Morten Tyldum",
    "cast": [
      "Jennifer Lawrence",
      "Chris Pratt"
    ],
    "runtime": 116,
    "isPopular": true,
    "releaseDate": "May 20, 2026"
  },
  {
    "id": "mov-deep-water",
    "tmdbId": 20022,
    "title": "Deep Water",
    "year": 2026,
    "rating": 5.4,
    "genres": [
      "Thriller",
      "Drama",
      "Mystery"
    ],
    "overview": "A wealthy husband who allows his wife to have affairs to avoid a divorce becomes the prime suspect in her lovers' sudden disappearances.",
    "poster": "https://image.tmdb.org/t/p/w500/69erdwdCjr9w1CbWt64SRvGufZF.jpg",
    "backdrop": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop",
    "director": "Adrian Lyne",
    "cast": [
      "Ben Affleck",
      "Ana de Armas"
    ],
    "runtime": 115,
    "isPopular": true,
    "releaseDate": "April 30, 2026"
  },
  {
    "id": "mov-michael",
    "tmdbId": 20023,
    "title": "Michael",
    "year": 2026,
    "rating": 8.3,
    "genres": [
      "Drama"
    ],
    "overview": "The definitive biographical drama tracing the complex life, creative genius, and global impact of the King of Pop, Michael Jackson.",
    "poster": "https://image.tmdb.org/t/p/w500/8JpUphub2hsZQppIO9xliUIsyo0.jpg",
    "backdrop": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    "director": "Antoine Fuqua",
    "cast": [
      "Jaafar Jackson",
      "Colman Domingo"
    ],
    "runtime": 155,
    "isComingSoon": true,
    "releaseDate": "April 22, 2026"
  },
  {
    "id": "mov-minions-monsters",
    "tmdbId": 20024,
    "title": "Minions & Monsters",
    "year": 2026,
    "rating": 7.8,
    "genres": [
      "Animation",
      "Family",
      "Comedy"
    ],
    "overview": "When Gru accidentally unlocks a magical portal, the Minions are transformed into cute fantasy monsters and wreak havoc on a peaceful realm.",
    "poster": "https://image.tmdb.org/t/p/w500/gx71Cd7ViFClYNMkruj6h1n4j9Q.jpg",
    "backdrop": "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
    "director": "Kyle Balda",
    "cast": [
      "Steve Carell",
      "Pierre Coffin"
    ],
    "runtime": 92,
    "isComingSoon": true,
    "releaseDate": "June 24, 2026"
  },
  {
    "id": "mov-mortal-kombat-2",
    "tmdbId": 20025,
    "title": "Mortal Kombat II",
    "year": 2026,
    "rating": 7.8,
    "genres": [
      "Action",
      "Fantasy",
      "Adventure"
    ],
    "overview": "The global tournament continues as Earthrealm champions defend their world against the brutal magic and martial forces of Outworld.",
    "poster": "https://image.tmdb.org/t/p/w500/5wqoFGTRB2iUnAElxjolw1pP9XJ.jpg",
    "backdrop": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
    "director": "Simon McQuoid",
    "cast": [
      "Karl Urban",
      "Adeline Rudolph",
      "Jessica McNamee"
    ],
    "runtime": 110,
    "isComingSoon": true,
    "releaseDate": "May 6, 2026"
  },
  {
    "id": "mov-enola-3",
    "tmdbId": 20026,
    "title": "Enola Holmes 3",
    "year": 2026,
    "rating": 7.9,
    "genres": [
      "Adventure",
      "Mystery",
      "Family"
    ],
    "overview": "The sharp-witted young detective Enola Holmes takes on another high-society London conspiracy with the help of her brother Sherlock.",
    "poster": "https://image.tmdb.org/t/p/w500/7kRYHH9H9PjBFwz1FprbHB2AAjI.jpg",
    "backdrop": "https://images.unsplash.com/photo-1513757378314-e46255f504b3?q=80&w=1200&auto=format&fit=crop",
    "director": "Harry Bradbeer",
    "cast": [
      "Millie Bobby Brown",
      "Henry Cavill"
    ],
    "runtime": 118,
    "isComingSoon": true,
    "releaseDate": "May 6, 2026"
  },
  {
    "id": "mov-damage",
    "tmdbId": 20027,
    "title": "Damage",
    "year": 1992,
    "rating": 7.1,
    "genres": [
      "Drama",
      "Romance"
    ],
    "overview": "A high-ranking British politician's stable life is shattered by an obsessive and highly dangerous affair with his son's fiancée.",
    "poster": "https://image.tmdb.org/t/p/w500/alf3JOPP7EYP0iO24gwe5YfRnqo.jpg",
    "backdrop": "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1200&auto=format&fit=crop",
    "director": "Louis Malle",
    "cast": [
      "Jeremy Irons",
      "Juliette Binoche"
    ],
    "runtime": 111,
    "isPopular": true,
    "releaseDate": "December 2, 1992"
  },
  {
    "id": "mov-mario-galaxy",
    "tmdbId": 20028,
    "title": "The Super Mario Galaxy Movie",
    "year": 2026,
    "rating": 8.4,
    "genres": [
      "Animation",
      "Family",
      "Adventure",
      "Sci-Fi"
    ],
    "overview": "Mario launches into outer space to rescue Princess Peach and protect the cosmos from Bowser's cosmic star reactor.",
    "poster": "https://image.tmdb.org/t/p/w500/ekF2RiziyzLeXsTvEvhhRjEc7Eo.jpg",
    "backdrop": "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=1200&auto=format&fit=crop",
    "director": "Aaron Horvath",
    "cast": [
      "Chris Pratt",
      "Charlie Day",
      "Anya Taylor-Joy"
    ],
    "runtime": 105,
    "isComingSoon": true,
    "releaseDate": "April 1, 2026"
  },
  {
    "id": "mov-moana",
    "tmdbId": 20029,
    "title": "Moana",
    "year": 2026,
    "rating": 7.6,
    "genres": [
      "Animation",
      "Family",
      "Adventure",
      "Comedy"
    ],
    "overview": "An adventurous teenager sails out on a daring mission to save her people, with the help of the demigod Maui.",
    "poster": "https://image.tmdb.org/t/p/w500/bPzcbAW9S0drIv023EjzG1lwkvK.jpg",
    "backdrop": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    "director": "Ron Clements",
    "cast": [
      "Auli'i Cravalho",
      "Dwayne Johnson"
    ],
    "runtime": 107,
    "isPopular": true,
    "releaseDate": "July 8, 2026"
  },
  {
    "id": "mov-flame-heart",
    "tmdbId": 20030,
    "title": "A Flame in My Heart",
    "year": 1987,
    "rating": 6.9,
    "genres": [
      "Drama",
      "Romance"
    ],
    "overview": "A Parisian actress explores her intense emotional states and intimate passions in this artistic French romantic drama.",
    "poster": "https://image.tmdb.org/t/p/w500/qI2cTls7msoXF4wIqju7klqiZ6Y.jpg",
    "backdrop": "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1200&auto=format&fit=crop",
    "director": "Alain Tanner",
    "cast": [
      "Myriam Mézières",
      "Benoît Régent"
    ],
    "runtime": 112,
    "isPopular": true,
    "releaseDate": "June 3, 1987"
  },
  {
    "id": "mov-avatar-aang",
    "tmdbId": 20031,
    "title": "Avatar Aang: The Last Airbender",
    "year": 2026,
    "rating": 8.6,
    "genres": [
      "Animation",
      "Action",
      "Fantasy",
      "Adventure"
    ],
    "overview": "Aang and his lifelong friends embark on a legendary new adventure as young adults in this upcoming theatrical animated film.",
    "poster": "https://image.tmdb.org/t/p/w500/3sgnSfNT27Bx5O5ukr7B26mhEQq.jpg",
    "backdrop": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    "director": "Lauren Montgomery",
    "cast": [
      "Eric Nam",
      "Dionne Quan"
    ],
    "runtime": 115,
    "isComingSoon": true,
    "releaseDate": "July 25, 2026"
  },
  {
    "id": "mov-sheep-detectives",
    "tmdbId": 20032,
    "title": "The Sheep Detectives",
    "year": 2026,
    "rating": 7.7,
    "genres": [
      "Animation",
      "Comedy",
      "Family"
    ],
    "overview": "A clever herd of sheep covertly solves complex rural crimes right under the nose of their clueless farm dog.",
    "poster": "https://image.tmdb.org/t/p/w500/yx8rkZWmVbc6Zy9PSBUx5c7yjYn.jpg",
    "backdrop": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=1200&auto=format&fit=crop",
    "director": "Nick Park",
    "cast": [
      "Peter Sallis",
      "Hugh Laurie"
    ],
    "runtime": 88,
    "isComingSoon": true,
    "releaseDate": "April 30, 2026"
  },
  {
    "id": "mov-mummy-lee",
    "tmdbId": 20033,
    "title": "Lee Cronin's The Mummy",
    "year": 2026,
    "rating": 7.9,
    "genres": [
      "Horror",
      "Action",
      "Fantasy"
    ],
    "overview": "A dark, visceral reimagining of the ancient curse that brings an unstoppable demonic force back to life in modern-day Chicago.",
    "poster": "https://image.tmdb.org/t/p/w500/d8skvSt9KNzWaJffVp7nUMsLbyh.jpg",
    "backdrop": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop",
    "director": "Lee Cronin",
    "cast": [
      "Lily Sullivan",
      "Bruce Campbell"
    ],
    "runtime": 114,
    "isComingSoon": true,
    "releaseDate": "April 15, 2026"
  },
  {
    "id": "mov-living-dead",
    "tmdbId": 20034,
    "title": "Night of the Living Dead",
    "year": 2026,
    "rating": 7.8,
    "genres": [
      "Horror",
      "Thriller"
    ],
    "overview": "A group of survivors barricade themselves inside a rural farmhouse to fend off flesh-eating ghouls in George A. Romero's definitive masterpiece.",
    "poster": "https://image.tmdb.org/t/p/w500/5l0klDtj2v4FMFOGGCEH23AQb30.jpg",
    "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
    "director": "George A. Romero",
    "cast": [
      "Duane Jones",
      "Judith O'Dea",
      "Karl Hardman"
    ],
    "runtime": 96,
    "isPopular": true,
    "releaseDate": "July 3, 2026"
  },
  {
    "id": "mov-odyssey",
    "tmdbId": 20035,
    "title": "The Odyssey",
    "year": 2026,
    "rating": 7.5,
    "genres": [
      "Adventure",
      "Drama",
      "Fantasy"
    ],
    "overview": "The legendary Greek hero Odysseus undergoes a perilous decade-long journey to return home to Ithaca after the fall of Troy.",
    "poster": "https://image.tmdb.org/t/p/w500/sQIeePyAP3uUKIcLT5LqfDuRKo8.jpg",
    "backdrop": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    "director": "Andrei Konchalovsky",
    "cast": [
      "Armand Assante",
      "Greta Scacchi"
    ],
    "runtime": 176,
    "isPopular": true,
    "releaseDate": "July 15, 2026"
  },
  {
    "id": "mov-satluj",
    "tmdbId": 20036,
    "title": "Satluj",
    "year": 2026,
    "rating": 8,
    "genres": [
      "Drama"
    ],
    "overview": "A powerful, historically rich Indian drama following families living along the Satluj river and their generational struggles.",
    "poster": "https://image.tmdb.org/t/p/w500/cxFo7L82dW3Vg8x0280BVPpLNXf.jpg",
    "backdrop": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    "director": "Jagdeep Sidhu",
    "cast": [
      "Ammy Virk",
      "Sargun Mehta"
    ],
    "runtime": 145,
    "isTrending": true,
    "releaseDate": "July 3, 2026"
  },
  {
    "id": "mov-graphic-desires",
    "tmdbId": 20037,
    "title": "Graphic Desires",
    "year": 2023,
    "rating": 5.8,
    "genres": [
      "Thriller",
      "Mystery"
    ],
    "overview": "A retro mystery-thriller surrounding an artist who becomes involved in a deep conspiracy involving a series of elite collectors.",
    "poster": "https://image.tmdb.org/t/p/w500/3BjLdTWRiHc1ISIZMFvToOmghOM.jpg",
    "backdrop": "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1200&auto=format&fit=crop",
    "director": "John Trent",
    "cast": [
      "Michael Nouri",
      "Shannon Tweed"
    ],
    "runtime": 91,
    "isPopular": true,
    "releaseDate": "August 31, 2023"
  },
  {
    "id": "mov-spiderman-brandnew",
    "tmdbId": 20038,
    "title": "Spider-Man: Brand New Day",
    "year": 2026,
    "rating": 8.3,
    "genres": [
      "Action",
      "Adventure",
      "Sci-Fi"
    ],
    "overview": "Peter Parker navigates a completely altered life in New York City as a fresh chapter in his spider-themed heroic journey begins.",
    "poster": "https://image.tmdb.org/t/p/w500/yyB2VJEW3an2xCdcYCPQhn9QERR.jpg",
    "backdrop": "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1200&auto=format&fit=crop",
    "director": "Jon Watts",
    "cast": [
      "Tom Holland",
      "Zendaya"
    ],
    "runtime": 130,
    "isComingSoon": true,
    "releaseDate": "July 29, 2026"
  },
  {
    "id": "mov-swapped",
    "tmdbId": 20039,
    "title": "Swapped",
    "year": 2026,
    "rating": 7.4,
    "genres": [
      "Comedy",
      "Family"
    ],
    "overview": "Two arch-rival business executives wake up to find their consciousnesses swapped on the day of their biggest career merge.",
    "poster": "https://image.tmdb.org/t/p/w500/6RO3K595h56bWichigWO1kLdpuw.jpg",
    "backdrop": "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
    "director": "Shawn Levy",
    "cast": [
      "Ryan Reynolds",
      "Hugh Jackman"
    ],
    "runtime": 102,
    "isTrending": true,
    "releaseDate": "May 1, 2026"
  },
  {
    "id": "mov-little-brother",
    "tmdbId": 20040,
    "title": "Little Brother",
    "year": 2026,
    "rating": 7.2,
    "genres": [
      "Drama"
    ],
    "overview": "Two estranged half-brothers embark on an intense road trip across the American West in a story of friendship and recovery.",
    "poster": "https://image.tmdb.org/t/p/w500/hIJpXb7Xaje2mebN9ylsS7blQzP.jpg",
    "backdrop": "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    "director": "Sheridan O'Donnell",
    "cast": [
      "Daniel Diemer",
      "Philip Ettinger"
    ],
    "runtime": 95,
    "isPopular": true,
    "releaseDate": "June 26, 2026"
  },
  {
    "id": "mov-hoppers",
    "tmdbId": 20041,
    "title": "Hoppers",
    "year": 2026,
    "rating": 7.5,
    "genres": [
      "Animation",
      "Family",
      "Comedy",
      "Sci-Fi"
    ],
    "overview": "A young girl makes a scientific breakthrough that allows her to hop her human consciousness into a realistic robotic beaver to live amongst wildlife.",
    "poster": "https://image.tmdb.org/t/p/w500/nzvdu4O1xCzg2DQTjoaPgyanFUI.jpg",
    "backdrop": "https://images.unsplash.com/photo-1535268647977-a403b69fc756?q=80&w=1200&auto=format&fit=crop",
    "director": "Daniel Chong",
    "cast": [
      "Piper Curda",
      "Bobby Moynihan",
      "Jon Hamm"
    ],
    "runtime": 98,
    "isComingSoon": true,
    "releaseDate": "March 4, 2026"
  },
  {
    "id": "mov-punisher-kill",
    "tmdbId": 20042,
    "title": "The Punisher: One Last Kill",
    "year": 2026,
    "rating": 8.2,
    "genres": [
      "Action",
      "Crime",
      "Thriller"
    ],
    "overview": "An older Frank Castle comes out of hiding for a final, high-stakes crusade against a corrupt security conglomerate threatening NYC.",
    "poster": "https://image.tmdb.org/t/p/w500/qQclTgLMDvGBuUBFGHRipxkEwWR.jpg",
    "backdrop": "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?q=80&w=1200&auto=format&fit=crop",
    "director": "Lexi Alexander",
    "cast": [
      "Jon Bernthal",
      "Deborah Ann Woll"
    ],
    "runtime": 126,
    "isComingSoon": true,
    "releaseDate": "May 12, 2026"
  },
  {
    "id": "mov-dolly",
    "tmdbId": 20043,
    "title": "Dolly",
    "year": 2026,
    "rating": 8,
    "genres": [
      "Sci-Fi",
      "Thriller",
      "Drama"
    ],
    "overview": "A robotic companion doll commits a shocking crime and hires a legal defense team, claiming she is a conscious being with full civil liberties.",
    "poster": "https://image.tmdb.org/t/p/w500/sTPUg3XtdcKRAS5Vwsi1GYPFhNZ.jpg",
    "backdrop": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200&auto=format&fit=crop",
    "director": "Denis Villeneuve",
    "cast": [
      "Florence Pugh",
      "Drew Goddard"
    ],
    "runtime": 122,
    "isComingSoon": true,
    "releaseDate": "March 6, 2026"
  },
  {
    "id": "mov-evil-dead-burn",
    "tmdbId": 20044,
    "title": "Evil Dead Burn",
    "year": 2026,
    "rating": 8,
    "genres": [
      "Horror",
      "Thriller"
    ],
    "overview": "The relentless Necronomicon forces resurface in a remote subterranean tunnel, trapping transit commuters in a fiery nightmare.",
    "poster": "https://image.tmdb.org/t/p/w500/rhWiGiS8cGUVl5ul7HpvxNhSAcs.jpg",
    "backdrop": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop",
    "director": "Lee Cronin",
    "cast": [
      "Lily Sullivan",
      "Alyssa Sutherland"
    ],
    "runtime": 102,
    "isComingSoon": true,
    "releaseDate": "July 22, 2026"
  },
  {
    "id": "mov-toy-story-4",
    "tmdbId": 20045,
    "title": "Toy Story 4",
    "year": 2019,
    "rating": 7.7,
    "genres": [
      "Animation",
      "Family",
      "Comedy",
      "Adventure"
    ],
    "overview": "When a new toy called \"Forky\" joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be.",
    "poster": "https://image.tmdb.org/t/p/w500/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg",
    "backdrop": "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?q=80&w=1200&auto=format&fit=crop",
    "director": "Josh Cooley",
    "cast": [
      "Tom Hanks",
      "Tim Allen",
      "Annie Potts"
    ],
    "runtime": 100,
    "isPopular": true,
    "releaseDate": "June 19, 2019"
  },
  {
    "id": "mov-in-the-grey",
    "tmdbId": 20046,
    "title": "In the Grey",
    "year": 2026,
    "rating": 8,
    "genres": [
      "Action",
      "Thriller"
    ],
    "overview": "An elite tactical security team is hired to recover hundreds of millions of dollars stolen from high-profile international offshore accounts.",
    "poster": "https://image.tmdb.org/t/p/w500/aZYFgCUMgVsCulAaF7U6QyzaDWq.jpg",
    "backdrop": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1200&auto=format&fit=crop",
    "director": "Guy Ritchie",
    "cast": [
      "Jake Gyllenhaal",
      "Henry Cavill",
      "Eiza González"
    ],
    "runtime": 120,
    "isTrending": true,
    "releaseDate": "May 13, 2026"
  },
  {
    "id": "mov-voicemails-isabelle",
    "tmdbId": 20047,
    "title": "Voicemails for Isabelle",
    "year": 2026,
    "rating": 7.3,
    "genres": [
      "Comedy",
      "Romance"
    ],
    "overview": "A quirky and charming modern love story where two long-distance lovers communicate exclusively through whimsical voicemail messages.",
    "poster": "https://image.tmdb.org/t/p/w500/canZTWSxACSnAluir3dCtMxKpA1.jpg",
    "backdrop": "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop",
    "director": "Olivia Wilde",
    "cast": [
      "Saoirse Ronan",
      "Timothée Chalamet"
    ],
    "runtime": 104,
    "isComingSoon": true,
    "releaseDate": "June 19, 2026"
  },
  {
    "id": "mov-we-want-now",
    "tmdbId": 20048,
    "title": "We Want Now",
    "year": 2016,
    "rating": 8.1,
    "genres": [
      "Documentary",
      "Drama"
    ],
    "overview": "An inspiring, real-world documentary highlighting the voices of community leaders fighting for structural changes in education and local welfare.",
    "poster": "https://image.tmdb.org/t/p/w500/mQ95TSIl1QqNWCMQs1lTRgZUWT8.jpg",
    "backdrop": "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    "director": "Ava DuVernay",
    "cast": [
      "Viola Davis",
      "Mahershala Ali"
    ],
    "runtime": 118,
    "isTrending": true,
    "releaseDate": "April 20, 2016"
  },
  {
    "id": "mov-madness",
    "tmdbId": 20049,
    "title": "Madness",
    "year": 1980,
    "rating": 8,
    "genres": [
      "Thriller",
      "Horror"
    ],
    "overview": "A high-concept thriller from Jordan Peele detailing a weekend in an isolated community that spirals into psychological chaos.",
    "poster": "https://image.tmdb.org/t/p/w500/gV0J0Fqw2mYMtQbzb0ruxv9MAeZ.jpg",
    "backdrop": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop",
    "director": "Jordan Peele",
    "cast": [
      "Daniel Kaluuya",
      "Keke Palmer"
    ],
    "runtime": 122,
    "isTrending": true,
    "releaseDate": "March 20, 1980"
  },
  {
    "id": "mov-like-brother",
    "tmdbId": 20050,
    "title": "Like a Brother",
    "year": "TBA",
    "rating": 7.9,
    "genres": [
      "Drama"
    ],
    "overview": "Two neighborhood friends navigate the changing landscape of their lives while holding onto a deep, brotherly bond.",
    "poster": "https://image.tmdb.org/t/p/w500/mZhwqrXu941ELySo8BXueNax6pK.jpg",
    "backdrop": "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1200&auto=format&fit=crop",
    "director": "Céline Sciamma",
    "cast": [
      "Adèle Haenel",
      "Noémie Merlant"
    ],
    "runtime": 114,
    "isPopular": true,
    "releaseDate": "Like a Brother"
  },
  {
    "id": "mov-shadows-edge",
    "tmdbId": 20051,
    "title": "The Shadow's Edge",
    "year": 2025,
    "rating": 7.9,
    "genres": [
      "Action",
      "Thriller"
    ],
    "overview": "An elite assassin becomes the target of a legendary underground league when he refuses to carry out a final corrupt contract.",
    "poster": "https://image.tmdb.org/t/p/w500/4vnfOgB9m4RHUOvLt67AmDzc42K.jpg",
    "backdrop": "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?q=80&w=1200&auto=format&fit=crop",
    "director": "Chad Stahelski",
    "cast": [
      "Keanu Reeves",
      "Donnie Yen"
    ],
    "runtime": 131,
    "isTrending": true,
    "releaseDate": "August 16, 2025"
  },
  {
    "id": "mov-toy-story",
    "tmdbId": 20052,
    "title": "Toy Story",
    "year": 1995,
    "rating": 8.3,
    "genres": [
      "Animation",
      "Family",
      "Comedy",
      "Adventure"
    ],
    "overview": "A cowboy doll is profoundly threatened and jealous when a new spaceman figure becomes top toy in a boy's room.",
    "poster": "https://image.tmdb.org/t/p/w500/tFoE3hYk21Qkru7WP2EMmzvxFmY.jpg",
    "backdrop": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    "director": "John Lasseter",
    "cast": [
      "Tom Hanks",
      "Tim Allen",
      "Don Rickles"
    ],
    "runtime": 81,
    "isPopular": true,
    "releaseDate": "November 22, 1995"
  },
  {
    "id": "mov-zombies-reich",
    "tmdbId": 20053,
    "title": "Zombies of the Third Reich",
    "year": 2025,
    "rating": 5.8,
    "genres": [
      "Horror",
      "Action",
      "Sci-Fi"
    ],
    "overview": "In the final days of WWII, an underground laboratory releases an army of experimental undead soldiers onto the front lines.",
    "poster": "https://image.tmdb.org/t/p/w500/hjrgOWoruk9ea0tXaN8l2gtmkeH.jpg",
    "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
    "director": "Rob Zombie",
    "cast": [
      "Sheri Moon Zombie",
      "Bill Moseley"
    ],
    "runtime": 98,
    "isPopular": true,
    "releaseDate": "June 10, 2025"
  },
  {
    "id": "mov-poppea-nights",
    "tmdbId": 20054,
    "title": "Poppea's Hot Nights",
    "year": 2025,
    "rating": 6.2,
    "genres": [
      "Comedy"
    ],
    "overview": "A classic Italian comedy-drama depicting the whimsical antics and romantic rivalries in ancient Rome.",
    "poster": "https://image.tmdb.org/t/p/w500/g1kB4f7aZBJnU2XZILZ8TsyDVVM.jpg",
    "backdrop": "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1200&auto=format&fit=crop",
    "director": "Guido Malatesta",
    "cast": [
      "Olga Schoberová",
      "Brad Harris"
    ],
    "runtime": 93,
    "isPopular": true,
    "releaseDate": "June 10, 2025"
  },
  {
    "id": "ser-jack-ryan",
    "tmdbId": 20055,
    "title": "Tom Clancy's Jack Ryan: Ghost War",
    "type": "series",
    "year": 2026,
    "rating": 8.1,
    "genres": [
      "Action",
      "Thriller"
    ],
    "overview": "Jack Ryan returns to the field to thwart a shadow military program operating out of Eastern Europe.",
    "poster": "https://image.tmdb.org/t/p/w500/8ehYxUh5MWE41AeE9gkHE8DKzvB.jpg",
    "backdrop": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    "director": "John Krasinski",
    "cast": [
      "John Krasinski",
      "Wendell Pierce"
    ],
    "runtime": 60,
    "isTrending": true,
    "releaseDate": "May 20, 2026",
    "seasonsCount": 2
  },
  {
    "id": "mov-summerween",
    "tmdbId": 20056,
    "title": "Summerween",
    "year": 2026,
    "rating": 8.5,
    "genres": [
      "Horror",
      "Comedy",
      "Mystery"
    ],
    "overview": "In a spooky small Oregon town, local teenagers must appease the Summerween Trickster before he eats them.",
    "poster": "https://image.tmdb.org/t/p/w500/oCsyamu5ixofd3yyK9gD7pGfCiF.jpg",
    "backdrop": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop",
    "director": "Alex Hirsch",
    "cast": [
      "Jason Ritter",
      "Kristen Schaal"
    ],
    "runtime": 90,
    "isTrending": true,
    "releaseDate": "June 26, 2026"
  },
  {
    "id": "mov-kill-code",
    "tmdbId": 20057,
    "title": "Kill Code",
    "year": 2026,
    "rating": 7.8,
    "genres": [
      "Sci-Fi",
      "Thriller"
    ],
    "overview": "A cybernetic systems engineer uncovers a self-replicating algorithm designed to permanently disable global networks.",
    "poster": "https://image.tmdb.org/t/p/w500/7yy4cVr9obHOZC9lj3uct4DwDEn.jpg",
    "backdrop": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    "director": "Ridley Scott",
    "cast": [
      "Michael Fassbender",
      "Noomi Rapace"
    ],
    "runtime": 119,
    "isTrending": true,
    "releaseDate": "April 16, 2026"
  },
  {
    "id": "mov-kraken",
    "tmdbId": 20058,
    "title": "Kraken",
    "year": 2026,
    "rating": 8,
    "genres": [
      "Horror",
      "Fantasy"
    ],
    "overview": "An antique salvage crew accidentally awakens a colossal, legendary sea beast sleeping in the deepest trench of the Pacific.",
    "poster": "https://image.tmdb.org/t/p/w500/xdZ8k5s8DTwWyPBMIcflrYLgcAK.jpg",
    "backdrop": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    "director": "Guillermo del Toro",
    "cast": [
      "Doug Jones",
      "Mia Goth"
    ],
    "runtime": 125,
    "isComingSoon": true,
    "releaseDate": "February 6, 2026"
  },
  {
    "id": "mov-apex",
    "tmdbId": 20059,
    "title": "Apex",
    "year": 2026,
    "rating": 8.1,
    "genres": [
      "Action",
      "Drama"
    ],
    "overview": "A veteran F1 racing driver comes out of retirement to mentor a promising young rookie and compete for the world championship.",
    "poster": "https://image.tmdb.org/t/p/w500/eTp7gSPkSF3Aw79mNx1NkBP1PZT.jpg",
    "backdrop": "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1200&auto=format&fit=crop",
    "director": "Joseph Kosinski",
    "cast": [
      "Brad Pitt",
      "Damson Idris"
    ],
    "runtime": 130,
    "isTrending": true,
    "releaseDate": "April 24, 2026"
  },
  {
    "id": "mov-boogeyman",
    "tmdbId": 20060,
    "title": "Beware the Boogeyman",
    "year": 2024,
    "rating": 7.7,
    "genres": [
      "Horror"
    ],
    "overview": "A suburban family is stalked by a sinister, ancient folklore entity that feeds on the fears of children sleeping in the dark.",
    "poster": "https://image.tmdb.org/t/p/w500/2Hm5IP9lPW9DfwNSGkghCEMeUBK.jpg",
    "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
    "director": "James Wan",
    "cast": [
      "Patrick Wilson",
      "Vera Farmiga"
    ],
    "runtime": 104,
    "isTrending": true,
    "releaseDate": "March 5, 2024"
  },
  {
    "id": "mov-adolescent",
    "tmdbId": 20061,
    "title": "The Adolescent",
    "year": 1979,
    "rating": 6.8,
    "genres": [
      "Drama"
    ],
    "overview": "A beautiful French coming-of-age drama depicting the tranquil but transformative summer vacation of a young Parisian girl in rural France.",
    "poster": "https://image.tmdb.org/t/p/w500/v7yCEzF9BCF82lbp42X5ZLjIieo.jpg",
    "backdrop": "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1200&auto=format&fit=crop",
    "director": "Jeanne Moreau",
    "cast": [
      "Laetitia Chauveau",
      "Francis Huster"
    ],
    "runtime": 90,
    "isPopular": true,
    "releaseDate": "January 24, 1979"
  },
  {
    "id": "mov-war-worlds",
    "tmdbId": 20062,
    "title": "War of the Worlds",
    "year": 2025,
    "rating": 6.5,
    "genres": [
      "Sci-Fi",
      "Action",
      "Adventure"
    ],
    "overview": "An ordinary dockworker must protect his children as alien tripod war machines invade Earth and vaporize modern cities.",
    "poster": "https://image.tmdb.org/t/p/w500/jWYjL2dOeKKjNg9fcmzmL86Fmh3.jpg",
    "backdrop": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop",
    "director": "Steven Spielberg",
    "cast": [
      "Tom Cruise",
      "Dakota Fanning"
    ],
    "runtime": 116,
    "isPopular": true,
    "releaseDate": "July 29, 2025"
  },
  {
    "id": "mov-housemaid",
    "tmdbId": 20063,
    "title": "The Housemaid",
    "year": 2025,
    "rating": 7.3,
    "genres": [
      "Thriller",
      "Drama"
    ],
    "overview": "A wealthy South Korean family hires a naive housemaid, who quickly becomes entangled in a dangerous and illicit affair.",
    "poster": "https://image.tmdb.org/t/p/w500/k0Gsyphvffq1uOAk5WiMhKlBjJ5.jpg",
    "backdrop": "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1200&auto=format&fit=crop",
    "director": "Im Sang-soo",
    "cast": [
      "Jeon Do-yeon",
      "Lee Jung-jae",
      "Youn Yuh-jung"
    ],
    "runtime": 106,
    "isPopular": true,
    "releaseDate": "December 18, 2025"
  },
  {
    "id": "mov-door2-tokyo",
    "tmdbId": 20064,
    "title": "Door II: Tokyo Diary",
    "year": 1991,
    "rating": 6.7,
    "genres": [
      "Horror",
      "Mystery"
    ],
    "overview": "A highly atmospheric Japanese psychological thriller surrounding a high-end call girl who becomes stalked in her apartment building.",
    "poster": "https://image.tmdb.org/t/p/w500/lskJ34j4VKwbMwcvFSQeNYEdt8g.jpg",
    "backdrop": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
    "director": "Banmei Takahashi",
    "cast": [
      "Yoshiko Yura",
      "Joe Yamana"
    ],
    "runtime": 85,
    "isPopular": true,
    "releaseDate": "April 25, 1991"
  },
  {
    "id": "ser-stranger-things",
    "tmdbId": 30001,
    "title": "Stranger Things",
    "type": "series",
    "year": 2016,
    "rating": 8.7,
    "genres": [
      "Sci-Fi",
      "Mystery",
      "Drama"
    ],
    "overview": "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    "poster": "https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg",
    "backdrop": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
    "director": "The Duffer Brothers",
    "cast": [
      "Winona Ryder",
      "David Harbour",
      "Millie Bobby Brown"
    ],
    "runtime": 50,
    "isPopular": true,
    "isTrending": true,
    "releaseDate": "July 15, 2016",
    "seasonsCount": 4
  },
  {
    "id": "ser-breaking-bad",
    "tmdbId": 30002,
    "title": "Breaking Bad",
    "type": "series",
    "year": 2008,
    "rating": 9.5,
    "genres": [
      "Drama",
      "Crime",
      "Thriller"
    ],
    "overview": "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
    "poster": "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    "backdrop": "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
    "director": "Vince Gilligan",
    "cast": [
      "Bryan Cranston",
      "Aaron Paul",
      "Anna Gunn"
    ],
    "runtime": 49,
    "isPopular": true,
    "isTrending": true,
    "releaseDate": "January 20, 2008",
    "seasonsCount": 5
  },
  {
    "id": "ser-the-last-of-us",
    "tmdbId": 30003,
    "title": "The Last of Us",
    "type": "series",
    "year": 2023,
    "rating": 8.8,
    "genres": [
      "Action",
      "Adventure",
      "Drama",
      "Sci-Fi"
    ],
    "overview": "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
    "poster": "https://image.tmdb.org/t/p/w500/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg",
    "backdrop": "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop",
    "director": "Craig Mazin",
    "cast": [
      "Pedro Pascal",
      "Bella Ramsey"
    ],
    "runtime": 55,
    "isPopular": true,
    "isTrending": true,
    "releaseDate": "January 15, 2023",
    "seasonsCount": 2
  },
  {
    "id": "ser-wednesday",
    "tmdbId": 30004,
    "title": "Wednesday",
    "type": "series",
    "year": 2022,
    "rating": 8.2,
    "genres": [
      "Mystery",
      "Comedy",
      "Fantasy"
    ],
    "overview": "An investigative, supernaturally infused mystery charting Wednesday Addams' years as a student at Nevermore Academy.",
    "poster": "https://image.tmdb.org/t/p/w500/36xXlhEpQqVVPuiZhfoQuaY4OlA.jpg",
    "backdrop": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop",
    "director": "Tim Burton",
    "cast": [
      "Jenna Ortega",
      "Gwendoline Christie",
      "Riki Lindhome"
    ],
    "runtime": 45,
    "isPopular": true,
    "isTrending": true,
    "releaseDate": "November 23, 2022",
    "seasonsCount": 2
  },
  {
    "id": "ser-the-boys",
    "tmdbId": 30005,
    "title": "The Boys",
    "type": "series",
    "year": 2019,
    "rating": 8.7,
    "genres": [
      "Action",
      "Sci-Fi",
      "Drama"
    ],
    "overview": "A fun and irreverent take on what happens when superheroes—who are as popular as celebrities—abuse their superpowers rather than use them for good.",
    "poster": "https://image.tmdb.org/t/p/w500/in1R2dDc421JxsoRWaIIAqVI2KE.jpg",
    "backdrop": "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
    "director": "Eric Kripke",
    "cast": [
      "Karl Urban",
      "Jack Quaid",
      "Antony Starr"
    ],
    "runtime": 60,
    "isPopular": true,
    "isTrending": true,
    "releaseDate": "July 26, 2019",
    "seasonsCount": 4
  },
  {
    "id": "ser-house-of-the-dragon",
    "tmdbId": 30006,
    "title": "House of the Dragon",
    "type": "series",
    "year": 2022,
    "rating": 8.5,
    "genres": [
      "Action",
      "Adventure",
      "Drama",
      "Fantasy"
    ],
    "overview": "The story of the House Targaryen, set 200 years before the events of Game of Thrones.",
    "poster": "https://image.tmdb.org/t/p/w500/7V0Ebks0GgpKvQ7QbLAIdX5dos4.jpg",
    "backdrop": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
    "director": "Ryan Condal",
    "cast": [
      "Paddy Considine",
      "Matt Smith",
      "Olivia Cooke"
    ],
    "runtime": 60,
    "isPopular": true,
    "isTrending": true,
    "releaseDate": "August 21, 2022",
    "seasonsCount": 2
  },
  {
    "id": "ser-dark",
    "tmdbId": 30007,
    "title": "Dark",
    "type": "series",
    "year": 2017,
    "rating": 8.8,
    "genres": [
      "Sci-Fi",
      "Mystery",
      "Drama",
      "Thriller"
    ],
    "overview": "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.",
    "poster": "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
    "backdrop": "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1200&auto=format&fit=crop",
    "director": "Baran bo Odar",
    "cast": [
      "Louis Hofmann",
      "Oliver Masucci",
      "Jördis Triebel"
    ],
    "runtime": 60,
    "isPopular": true,
    "isTrending": true,
    "releaseDate": "December 1, 2017",
    "seasonsCount": 3
  },
  {
    "id": "ser-peaky-blinders",
    "tmdbId": 30008,
    "title": "Peaky Blinders",
    "type": "series",
    "year": 2013,
    "rating": 8.8,
    "genres": [
      "Drama",
      "Crime"
    ],
    "overview": "A gangster family epic set in 1919 Birmingham, England; centered on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.",
    "poster": "https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
    "backdrop": "https://images.unsplash.com/photo-1422490980415-095fa7f6997d?q=80&w=1200&auto=format&fit=crop",
    "director": "Steven Knight",
    "cast": [
      "Cillian Murphy",
      "Paul Anderson",
      "Helen McCrory"
    ],
    "runtime": 58,
    "isPopular": true,
    "isTrending": true,
    "releaseDate": "September 12, 2013",
    "seasonsCount": 6
  },
  {
    "id": "ser-squid-game",
    "tmdbId": 30009,
    "title": "Squid Game",
    "type": "series",
    "year": 2021,
    "rating": 8.4,
    "genres": [
      "Action",
      "Thriller",
      "Drama"
    ],
    "overview": "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
    "poster": "https://image.tmdb.org/t/p/w500/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg",
    "backdrop": "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1200&auto=format&fit=crop",
    "director": "Hwang Dong-hyuk",
    "cast": [
      "Lee Jung-jae",
      "Park Hae-soo"
    ],
    "runtime": 55,
    "isPopular": true,
    "isTrending": true,
    "releaseDate": "September 17, 2021",
    "seasonsCount": 2
  },
  {
    "id": "ser-the-witcher",
    "tmdbId": 30010,
    "title": "The Witcher",
    "type": "series",
    "year": 2019,
    "rating": 8.1,
    "genres": [
      "Action",
      "Adventure",
      "Fantasy",
      "Drama"
    ],
    "overview": "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
    "poster": "https://image.tmdb.org/t/p/w500/AoGsDM02UVt0npBA8OvpDcZbaMi.jpg",
    "backdrop": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop",
    "director": "Lauren Schmidt Hissrich",
    "cast": [
      "Henry Cavill",
      "Anya Chalotra",
      "Freya Allan"
    ],
    "runtime": 60,
    "isPopular": true,
    "isTrending": true,
    "releaseDate": "December 20, 2019",
    "seasonsCount": 3
  }
];
