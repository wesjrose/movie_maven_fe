/** Types matching `api/openapi.yaml` catalog schemas. */

export type Movie = {
  id: number
  tmdb_id: number
  title: string
  original_title: string
  overview: string
  release_date: string | null
  poster_path: string
  backdrop_path: string
  original_language: string
  vote_average: number
  vote_count: number
  popularity: number
  adult: boolean
  genre_ids: number[]
  created_at: string
  updated_at: string
}

export type ListMoviesResponse = {
  page: number
  page_size: number
  total_pages: number
  total_results: number
  movies: Movie[]
}

export type Genre = {
  id: number
  media_type: 'movie' | 'tv'
  name: string
}

export type PopulateGenresResponse = {
  saved: number
  genres: Genre[]
}

export type ApiError = {
  error: string
}
