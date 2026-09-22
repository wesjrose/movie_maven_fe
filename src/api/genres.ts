import { errorMessage } from './http.ts'
import type { PopulateGenresResponse } from './types.ts'

const API_BASE = '/api'

// There is no read-only genres endpoint; /populate-genres re-ingests TMDB's
// movie and TV genre lists and returns them as a side effect.
export async function fetchGenres(): Promise<PopulateGenresResponse> {
  const response = await fetch(`${API_BASE}/populate-genres`)
  if (!response.ok) {
    throw new Error(await errorMessage(response, 'Failed to load genres'))
  }

  return (await response.json()) as PopulateGenresResponse
}
