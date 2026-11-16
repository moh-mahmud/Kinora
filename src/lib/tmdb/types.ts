export type MediaType = "movie" | "tv";

export interface Genre {
  id: number;
  name: string;
}

export interface MediaSummary {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: MediaType;
  genre_ids?: number[];
  popularity?: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface SeasonSummary {
  id?: number;
  name: string;
  season_number: number;
  episode_count: number;
  poster_path: string | null;
  overview?: string;
}

export interface EpisodeSummary {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  still_path: string | null;
  runtime?: number | null;
  vote_average?: number;
  air_date?: string | null;
}

export interface SeasonDetails {
  id?: number;
  name: string;
  season_number: number;
  overview?: string;
  episodes: EpisodeSummary[];
}

export interface MediaDetails extends MediaSummary {
  genres: Genre[];
  runtime?: number | null;
  episode_run_time?: number[];
  status?: string;
  tagline?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  seasons?: SeasonSummary[];
  credits?: {
    cast: CastMember[];
  };
  similar?: {
    results: MediaSummary[];
  };
  videos?: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface HomeCatalog {
  trending: MediaSummary[];
  popularMovies: MediaSummary[];
  topRatedMovies: MediaSummary[];
  popularTv: MediaSummary[];
  topRatedTv: MediaSummary[];
  genres: Genre[];
  byGenre: Record<number, MediaSummary[]>;
  hero: MediaSummary;
  usingMockData: boolean;
}
