import { IMovie } from "./NetflixAtom";

const BASE_URL = `https://api.themoviedb.org/3`;

export interface IGetMovieResult {
  dates: { maximum: string; minimum: string };
  page: number;
  total_pages: number;
  total_results: number;
  results: IMovie[];
}

export function getMovies() {
  return fetch(
    `${BASE_URL}/movie/now_playing?language=en-US&page=1&region=kr&api_key=${process.env.REACT_APP_MOVIE_API_KEY}`
  ).then((res) => res.json());
}
