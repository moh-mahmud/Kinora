import type {
  Genre,
  MediaDetails,
  MediaSummary,
  PaginatedResponse,
} from "./types";

export const MOCK_GENRES: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
];

const movies: MediaSummary[] = [
  {
    id: 27205,
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology is offered a chance to erase his criminal past—if he can plant an idea in a target's mind.",
    poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    vote_average: 8.4,
    vote_count: 36000,
    release_date: "2010-07-15",
    media_type: "movie",
    genre_ids: [28, 878, 12],
    popularity: 98,
  },
  {
    id: 157336,
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival among the stars.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    vote_average: 8.5,
    vote_count: 34000,
    release_date: "2014-11-05",
    media_type: "movie",
    genre_ids: [12, 18, 878],
    popularity: 120,
  },
  {
    id: 155,
    title: "The Dark Knight",
    overview:
      "Batman raises the stakes in his war on crime with the help of Lt. Gordon and District Attorney Harvey Dent—until the Joker plunges Gotham into chaos.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hqkIcbrOHL86HxnGIzt4hp5ZvIk.jpg",
    vote_average: 8.5,
    vote_count: 32000,
    release_date: "2008-07-16",
    media_type: "movie",
    genre_ids: [28, 80, 18],
    popularity: 110,
  },
  {
    id: 680,
    title: "Pulp Fiction",
    overview:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    vote_average: 8.5,
    vote_count: 27000,
    release_date: "1994-09-10",
    media_type: "movie",
    genre_ids: [53, 80],
    popularity: 85,
  },
  {
    id: 496243,
    title: "Parasite",
    overview:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop_path: "/TU9NIjwzqpKcgU7kP4cYvOgKym.jpg",
    vote_average: 8.5,
    vote_count: 18000,
    release_date: "2019-05-30",
    media_type: "movie",
    genre_ids: [35, 53, 18],
    popularity: 95,
  },
  {
    id: 11,
    title: "Star Wars",
    overview:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee, and two droids to save the galaxy from the Empire's world-destroying battle station.",
    poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    backdrop_path: "/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg",
    vote_average: 8.2,
    vote_count: 20000,
    release_date: "1977-05-25",
    media_type: "movie",
    genre_ids: [12, 28, 878],
    popularity: 90,
  },
  {
    id: 550,
    title: "Fight Club",
    overview:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much more.",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
    vote_average: 8.4,
    vote_count: 28000,
    release_date: "1999-10-15",
    media_type: "movie",
    genre_ids: [18],
    popularity: 88,
  },
  {
    id: 603,
    title: "The Matrix",
    overview:
      "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop_path: "/icmmSD4vTTDKHsMsA0OyySAgaxA.jpg",
    vote_average: 8.2,
    vote_count: 25000,
    release_date: "1999-03-30",
    media_type: "movie",
    genre_ids: [28, 878],
    popularity: 100,
  },
  {
    id: 424,
    title: "Schindler's List",
    overview:
      "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution.",
    poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    backdrop_path: "/rO11ZKRJcxLVD56Xq5zB8NqK0v.jpg",
    vote_average: 8.6,
    vote_count: 15000,
    release_date: "1993-11-30",
    media_type: "movie",
    genre_ids: [18, 36],
    popularity: 70,
  },
  {
    id: 13,
    title: "Forrest Gump",
    overview:
      "The presidencies of Kennedy and Johnson, Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.",
    poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop_path: "/7c9UVPPiTSlce1A7u9BXUfI70i.jpg",
    vote_average: 8.5,
    vote_count: 26000,
    release_date: "1994-06-23",
    media_type: "movie",
    genre_ids: [35, 18, 10749],
    popularity: 92,
  },
  {
    id: 122,
    title: "The Lord of the Rings: The Return of the King",
    overview:
      "Aragorn is revealed as the heir to the ancient kings as he, Gandalf, and the other members of the broken fellowship continue against Sauron.",
    poster_path: "/rCzpDGLbOoPwLjy3OAm5NUOZVdA.jpg",
    backdrop_path: "/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg",
    vote_average: 8.5,
    vote_count: 23000,
    release_date: "2003-12-01",
    media_type: "movie",
    genre_ids: [12, 14, 28],
    popularity: 105,
  },
  {
    id: 278,
    title: "The Shawshank Redemption",
    overview:
      "Framed for the murder of his wife, banker Andy Dufresne begins a new life at Shawshank prison—and forms a friendship that will last decades.",
    poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    vote_average: 8.7,
    vote_count: 26000,
    release_date: "1994-09-23",
    media_type: "movie",
    genre_ids: [18, 80],
    popularity: 115,
  },
];

const tvShows: MediaSummary[] = [
  {
    id: 1396,
    title: "Breaking Bad",
    name: "Breaking Bad",
    overview:
      "A chemistry teacher diagnosed with cancer teams with a former student to cook and sell crystal meth to secure his family's future.",
    poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    backdrop_path: "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    vote_average: 8.9,
    vote_count: 14000,
    first_air_date: "2008-01-20",
    media_type: "tv",
    genre_ids: [18, 80],
    popularity: 130,
  },
  {
    id: 1399,
    title: "Game of Thrones",
    name: "Game of Thrones",
    overview:
      "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    poster_path: "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    backdrop_path: "/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg",
    vote_average: 8.4,
    vote_count: 23000,
    first_air_date: "2011-04-17",
    media_type: "tv",
    genre_ids: [18, 10765, 10759],
    popularity: 140,
  },
  {
    id: 66732,
    title: "Stranger Things",
    name: "Stranger Things",
    overview:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    vote_average: 8.6,
    vote_count: 17000,
    first_air_date: "2016-07-15",
    media_type: "tv",
    genre_ids: [18, 9648, 878],
    popularity: 125,
  },
  {
    id: 94605,
    title: "Arcane",
    name: "Arcane",
    overview:
      "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
    poster_path: "/fqldfLcRRdJ6GIs8yXjupd8UpJQ.jpg",
    backdrop_path: "/qK7S48hi0MNQ5lYz3Z0Y5lqTpY.jpg",
    vote_average: 8.7,
    vote_count: 4500,
    first_air_date: "2021-11-06",
    media_type: "tv",
    genre_ids: [16, 10765, 18],
    popularity: 118,
  },
  {
    id: 87108,
    title: "Chernobyl",
    name: "Chernobyl",
    overview:
      "The true story of one of the worst man-made catastrophes in history and the courageous men and women who sacrificed everything to save Europe.",
    poster_path: "/hlLXtVggkgYcIXu9H4zPQ2e7fJ.jpg",
    backdrop_path: "/900tHlUYUkp7Ol04XFSoAaEIXcT.jpg",
    vote_average: 8.7,
    vote_count: 6000,
    first_air_date: "2019-05-06",
    media_type: "tv",
    genre_ids: [18],
    popularity: 80,
  },
  {
    id: 100088,
    title: "The Last of Us",
    name: "The Last of Us",
    overview:
      "Twenty years after a fungal outbreak collapses civilization, a hardened survivor escorts a teenage girl across a post-apocalyptic United States.",
    poster_path: "/uKvVjHNqB7KmYpDdXmZMzF5zV0L.jpg",
    backdrop_path: "/uDgy6hyIclw0XmMWePSjCbmN0BN.jpg",
    vote_average: 8.7,
    vote_count: 5000,
    first_air_date: "2023-01-15",
    media_type: "tv",
    genre_ids: [18, 10759, 10765],
    popularity: 135,
  },
];

const allMedia = [...movies, ...tvShows];

const castPools = [
  { id: 1, name: "Leonardo DiCaprio", character: "Cobb", profile_path: null, order: 0 },
  { id: 2, name: "Joseph Gordon-Levitt", character: "Arthur", profile_path: null, order: 1 },
  { id: 3, name: "Elliot Page", character: "Ariadne", profile_path: null, order: 2 },
  { id: 4, name: "Matthew McConaughey", character: "Cooper", profile_path: null, order: 0 },
  { id: 5, name: "Anne Hathaway", character: "Brand", profile_path: null, order: 1 },
  { id: 6, name: "Christian Bale", character: "Bruce Wayne", profile_path: null, order: 0 },
  { id: 7, name: "Heath Ledger", character: "Joker", profile_path: null, order: 1 },
  { id: 8, name: "Bryan Cranston", character: "Walter White", profile_path: null, order: 0 },
  { id: 9, name: "Aaron Paul", character: "Jesse Pinkman", profile_path: null, order: 1 },
  { id: 10, name: "Millie Bobby Brown", character: "Eleven", profile_path: null, order: 0 },
];

function paginate<T>(items: T[], page = 1, pageSize = 20): PaginatedResponse<T> {
  const start = (page - 1) * pageSize;
  const slice = items.slice(start, start + pageSize);
  return {
    page,
    results: slice,
    total_pages: Math.max(1, Math.ceil(items.length / pageSize)),
    total_results: items.length,
  };
}

function matchesQuery(item: MediaSummary, query: string) {
  const q = query.toLowerCase();
  return (
    item.title.toLowerCase().includes(q) ||
    (item.name?.toLowerCase().includes(q) ?? false) ||
    item.overview.toLowerCase().includes(q)
  );
}

export function getMockTitle(type: "movie" | "tv", id: number): MediaDetails | null {
  const base = allMedia.find((item) => item.id === id && (item.media_type ?? "movie") === type);
  if (!base) return null;

  const genres = MOCK_GENRES.filter((g) => base.genre_ids?.includes(g.id));
  const similar = allMedia
    .filter((item) => item.id !== id && item.media_type === type)
    .slice(0, 8);

  return {
    ...base,
    genres,
    runtime: type === "movie" ? 142 : undefined,
    episode_run_time: type === "tv" ? [55] : undefined,
    number_of_seasons: type === "tv" ? 4 : undefined,
    number_of_episodes: type === "tv" ? 40 : undefined,
    status: "Released",
    tagline: type === "movie" ? "Your mind is the scene of the crime." : "One choice changes everything.",
    credits: {
      cast: castPools.slice(0, 6).map((member, index) => ({
        ...member,
        order: index,
      })),
    },
    similar: { results: similar },
    videos: {
      results: [
        {
          id: "demo-trailer",
          key: "YoHD9XEInc0",
          name: "Official Trailer",
          site: "YouTube",
          type: "Trailer",
        },
      ],
    },
  };
}

export function mockTrending() {
  return paginate(
    [...allMedia].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)),
  );
}

export function mockPopularMovies() {
  return paginate(movies);
}

export function mockTopRatedMovies() {
  return paginate([...movies].sort((a, b) => b.vote_average - a.vote_average));
}

export function mockPopularTv() {
  return paginate(tvShows);
}

export function mockTopRatedTv() {
  return paginate([...tvShows].sort((a, b) => b.vote_average - a.vote_average));
}

export function mockDiscoverByGenre(genreId: number) {
  return paginate(allMedia.filter((item) => item.genre_ids?.includes(genreId)));
}

export function mockSearch(query: string, page = 1) {
  if (!query.trim()) {
    return paginate(allMedia, page);
  }
  return paginate(allMedia.filter((item) => matchesQuery(item, query)), page);
}

export function mockBrowse(params: {
  type?: "movie" | "tv" | "all";
  genre?: number;
  query?: string;
  page?: number;
}) {
  const { type = "all", genre, query = "", page = 1 } = params;
  let items = allMedia;
  if (type !== "all") {
    items = items.filter((item) => (item.media_type ?? "movie") === type);
  }
  if (genre) {
    items = items.filter((item) => item.genre_ids?.includes(genre));
  }
  if (query.trim()) {
    items = items.filter((item) => matchesQuery(item, query));
  }
  return paginate(items, page);
}

export { movies as MOCK_MOVIES, tvShows as MOCK_TV, allMedia as MOCK_ALL };
