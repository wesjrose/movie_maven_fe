import type { ApiError, ListMoviesResponse } from './types.ts'

const API_BASE = '/api'

export const MOVIE_PAGE_SIZE = 20

export async function listMovies(
  page = 1,
  pageSize = MOVIE_PAGE_SIZE,
): Promise<ListMoviesResponse> {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  })

  const response = await fetch(`${API_BASE}/movies?${params}`)
  if (!response.ok) {
    throw new Error(await errorMessage(response))
  }

  return (await response.json()) as ListMoviesResponse
}

async function errorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as ApiError
    if (body && typeof body.error === 'string' && body.error) {
      return body.error
    }
  } catch {
    // Body was not JSON; fall through to the status text.
  }
  return response.statusText || 'Failed to load movies'
}
