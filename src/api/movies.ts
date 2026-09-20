import { errorMessage } from './http.ts'
import type { ListMoviesResponse } from './types.ts'

const API_BASE = '/api'

export const MOVIE_PAGE_SIZE = 20

export async function listMovies(
  page = 1,
  pageSize = MOVIE_PAGE_SIZE,
  genreId: number | null = null,
): Promise<ListMoviesResponse> {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  })
  if (genreId !== null) {
    params.set('genre_id', String(genreId))
  }

  const response = await fetch(`${API_BASE}/movies?${params}`)
  if (!response.ok) {
    throw new Error(await errorMessage(response, 'Failed to load movies'))
  }

  return (await response.json()) as ListMoviesResponse
}
