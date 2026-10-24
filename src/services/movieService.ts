import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

const API_URL = "https://api.themoviedb.org/3/search/movie";

export async function fetchMovies(query: string): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  const response = await axios.get<MoviesResponse>(API_URL, {
    params: { query },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.results;
}
