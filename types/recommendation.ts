export interface ClaudeMovieRaw {
  title: string;
  year: number;
  reason: string;
}

export interface MovieRecommendation {
  title: string;
  year: number;
  reason: string;
  posterUrl: string | null;
  rating: number | null;
  overview: string | null;
  tmdbId: number | null;
}

export interface RecommendationResult {
  summary: string;
  movies: MovieRecommendation[];
}

export interface APIError {
  error: string;
  details?: string;
}
