import { ClaudeMovieRaw, MovieRecommendation } from "@/types/recommendation";

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    "Content-Type": "application/json",
  };
}

interface TMDBSearchResult {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  vote_average: number;
  overview: string;
}

async function searchMovie(title: string, year?: number): Promise<TMDBSearchResult | null> {
  const params = new URLSearchParams({ query: title });
  if (year) params.set("year", String(year));

  const res = await fetch(`${TMDB_BASE}/search/movie?${params}`, { headers: getHeaders() });
  if (!res.ok) return null;

  const data = await res.json();
  return data.results?.[0] ?? null;
}

async function searchMovieFuzzy(title: string): Promise<TMDBSearchResult | null> {
  return searchMovie(title);
}

export async function enrichMovies(claudeMovies: ClaudeMovieRaw[]): Promise<MovieRecommendation[]> {
  const results = await Promise.all(
    claudeMovies.map(async (movie): Promise<MovieRecommendation | null> => {
      let tmdb = await searchMovie(movie.title, movie.year);
      if (!tmdb) {
        tmdb = await searchMovieFuzzy(movie.title);
      }

      if (!tmdb) {
        return {
          title: movie.title,
          year: movie.year,
          reason: movie.reason,
          posterUrl: null,
          rating: null,
          overview: null,
          tmdbId: null,
        };
      }

      return {
        title: movie.title,
        year: movie.year,
        reason: movie.reason,
        posterUrl: tmdb.poster_path ? `${TMDB_IMAGE_BASE}${tmdb.poster_path}` : null,
        rating: tmdb.vote_average || null,
        overview: tmdb.overview || null,
        tmdbId: tmdb.id,
      };
    })
  );

  return results.filter((r): r is MovieRecommendation => r !== null);
}
