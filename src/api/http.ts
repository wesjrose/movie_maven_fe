import type { ApiError } from './types.ts'

export async function errorMessage(response: Response, fallback: string): Promise<string> {
  try {
    const body = (await response.json()) as ApiError
    if (body && typeof body.error === 'string' && body.error) {
      return body.error
    }
  } catch {
    // Body was not JSON; fall through to the status text.
  }
  return response.statusText || fallback
}
