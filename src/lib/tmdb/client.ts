import {
  MOCK_GENRES,
  getMockTitle,
  mockBrowse,
  mockDiscoverByGenre,
  mockPopularMovies,
  mockPopularTv,
  mockSearch,
  mockTopRatedMovies,
  mockTopRatedTv,
  mockTrending,
} from "./mock-data";
import type {
  Genre,
  HomeCatalog,
  MediaDetails,
  MediaSummary,
  MediaType,
  PaginatedResponse,
} from "./types";

const TMDB_API_BASE = "https://api.themoviedb.org/3";

function getAuth() {
  const token = process.env.TMDB_READ_ACCESS_TOKEN?.trim();
  const apiKey = process.env.TMDB_API_KEY?.trim();
  return { token, apiKey, hasCredentials: Boolean(token || apiKey) };
}

export function isUsingMockData() {
  return !getAuth().hasCredentials;
}

async function tmdbFetch<T>(
  path: string,
  searchParams: Record<string, string | number | undefined> = {},
): Promise<T> {
  const { token, apiKey } = getAuth();
  const url = new URL(`${TMDB_API_BASE}${path}`);
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }
  if (apiKey && !token) {
    url.searchParams.set("api_key", apiKey);
  }

  const headers: HeadersInit = {
    Accept: "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), {
    headers,
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`TMDb request failed (${response.status}) for ${path}`);
  }

  return response.json() as Promise<T>;
}

function normalizeSummary(
  item: MediaSummary,
  fallbackType?: MediaType,
): MediaSummary {
  const mediaType =
    item.media_type ??
    fallbackType ??
    (item.first_air_date || item.name ? "tv" : "movie");
  const title = item.title || item.name || "Untitled";
  return {
    ...item,
    title,
    media_type: mediaType,
  };
}

async function safeList(
  live: () => Promise<PaginatedResponse<MediaSummary>>,
  fallback: () => PaginatedResponse<MediaSummary>,
  fallbackType?: MediaType,
): Promise<PaginatedResponse<MediaSummary>> {
  if (!getAuth().hasCredentials) {
    return fallback();
  }
  try {
    const data = await live();
    return {
      ...data,
      results: data.results.map((item) => normalizeSummary(item, fallbackType)),
    };
  } catch {
    return fallback();
  }
}

export async function getTrending(
  page = 1,
): Promise<PaginatedResponse<MediaSummary>> {
  return safeList(
    () =>
      tmdbFetch<PaginatedResponse<MediaSummary>>("/trending/all/week", {
        page,
      }),
    () => mockTrending(),
  );
}

export async function getPopularMovies(
  page = 1,
): Promise<PaginatedResponse<MediaSummary>> {
  return safeList(
    () =>
      tmdbFetch<PaginatedResponse<MediaSummary>>("/movie/popular", { page }),
    () => mockPopularMovies(),
    "movie",
  );
}

export async function getTopRatedMovies(
  page = 1,
): Promise<PaginatedResponse<MediaSummary>> {
  return safeList(
    () =>
      tmdbFetch<PaginatedResponse<MediaSummary>>("/movie/top_rated", { page }),
    () => mockTopRatedMovies(),
    "movie",
  );
}

export async function getPopularTv(
  page = 1,
): Promise<PaginatedResponse<MediaSummary>> {
  return safeList(
    () => tmdbFetch<PaginatedResponse<MediaSummary>>("/tv/popular", { page }),
    () => mockPopularTv(),
    "tv",
  );
}

export async function getTopRatedTv(
  page = 1,
): Promise<PaginatedResponse<MediaSummary>> {
  return safeList(
    () => tmdbFetch<PaginatedResponse<MediaSummary>>("/tv/top_rated", { page }),
    () => mockTopRatedTv(),
    "tv",
  );
}

export async function getGenres(): Promise<Genre[]> {
  if (!getAuth().hasCredentials) {
    return MOCK_GENRES;
  }
  try {
    const data = await tmdbFetch<{ genres: Genre[] }>("/genre/movie/list");
    return data.genres;
  } catch {
    return MOCK_GENRES;
  }
}

export async function getMoviesByGenre(
  genreId: number,
  page = 1,
): Promise<PaginatedResponse<MediaSummary>> {
  return safeList(
    () =>
      tmdbFetch<PaginatedResponse<MediaSummary>>("/discover/movie", {
        with_genres: genreId,
        sort_by: "popularity.desc",
        page,
      }),
    () => mockDiscoverByGenre(genreId),
    "movie",
  );
}

export async function searchMulti(
  query: string,
  page = 1,
): Promise<PaginatedResponse<MediaSummary>> {
  if (!query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
  return safeList(
    async () => {
      const data = await tmdbFetch<PaginatedResponse<MediaSummary>>(
        "/search/multi",
        { query, page, include_adult: "false" },
      );
      return {
        ...data,
        results: data.results
          .filter(
            (item) =>
              item.media_type === "movie" ||
              item.media_type === "tv" ||
              Boolean(item.title) ||
              Boolean(item.name),
          )
          .map((item) => normalizeSummary(item)),
      };
    },
    () => mockSearch(query, page),
  );
}

export async function browseMedia(params: {
  type?: "movie" | "tv" | "all";
  genre?: number;
  query?: string;
  page?: number;
}): Promise<PaginatedResponse<MediaSummary>> {
  const { type = "all", genre, query = "", page = 1 } = params;

  if (query.trim()) {
    const results = await searchMulti(query, page);
    if (type === "all" && !genre) return results;
    return {
      ...results,
      results: results.results.filter((item) => {
        const mediaType = item.media_type ?? "movie";
        const typeOk = type === "all" || mediaType === type;
        const genreOk = !genre || item.genre_ids?.includes(genre);
        return typeOk && genreOk;
      }),
    };
  }

  if (!getAuth().hasCredentials) {
    return mockBrowse({ type, genre, query, page });
  }

  try {
    if (type === "tv") {
      if (genre) {
        return safeList(
          () =>
            tmdbFetch<PaginatedResponse<MediaSummary>>("/discover/tv", {
              with_genres: genre,
              sort_by: "popularity.desc",
              page,
            }),
          () => mockBrowse({ type, genre, page }),
          "tv",
        );
      }
      return getPopularTv(page);
    }

    if (genre) {
      return getMoviesByGenre(genre, page);
    }

    if (type === "movie") {
      return getPopularMovies(page);
    }

    return getTrending(page);
  } catch {
    return mockBrowse({ type, genre, query, page });
  }
}

export async function getTitleDetails(
  type: MediaType,
  id: number,
): Promise<MediaDetails | null> {
  if (!getAuth().hasCredentials) {
    return getMockTitle(type, id);
  }

  try {
    const data = await tmdbFetch<MediaDetails>(`/${type}/${id}`, {
      append_to_response: "credits,similar,videos",
    });
    return normalizeSummary(data, type) as MediaDetails;
  } catch {
    return getMockTitle(type, id);
  }
}

export async function getHomeCatalog(): Promise<HomeCatalog> {
  const usingMockData = isUsingMockData();
  const [
    trending,
    popularMovies,
    topRatedMovies,
    popularTv,
    topRatedTv,
    genres,
  ] = await Promise.all([
    getTrending(),
    getPopularMovies(),
    getTopRatedMovies(),
    getPopularTv(),
    getTopRatedTv(),
    getGenres(),
  ]);

  const featuredGenres = genres.slice(0, 4);
  const byGenreEntries = await Promise.all(
    featuredGenres.map(async (genre) => {
      const list = await getMoviesByGenre(genre.id);
      return [genre.id, list.results] as const;
    }),
  );

  const hero =
    trending.results.find((item) => item.backdrop_path) ??
    popularMovies.results[0] ??
    trending.results[0];

  return {
    trending: trending.results,
    popularMovies: popularMovies.results,
    topRatedMovies: topRatedMovies.results,
    popularTv: popularTv.results,
    topRatedTv: topRatedTv.results,
    genres,
    byGenre: Object.fromEntries(byGenreEntries),
    hero,
    usingMockData,
  };
}

export function mediaHref(item: Pick<MediaSummary, "id" | "media_type" | "title" | "name" | "first_air_date">) {
  const type =
    item.media_type ??
    (item.first_air_date || item.name ? "tv" : "movie");
  return `/${type}/${item.id}`;
}

export function watchHref(
  type: MediaType,
  id: number,
  opts?: { season?: number; episode?: number },
) {
  const params = new URLSearchParams();
  if (opts?.season) params.set("season", String(opts.season));
  if (opts?.episode) params.set("episode", String(opts.episode));
  const qs = params.toString();
  return `/watch/${type}/${id}${qs ? `?${qs}` : ""}`;
}

export function displayTitle(item: Pick<MediaSummary, "title" | "name">) {
  return item.title || item.name || "Untitled";
}

export function releaseYear(
  item: Pick<MediaSummary, "release_date" | "first_air_date">,
) {
  const date = item.release_date || item.first_air_date;
  return date ? date.slice(0, 4) : null;
}
