import { useCallback, useEffect, useRef, useState } from 'react'
import { listMovies, MOVIE_PAGE_SIZE } from '../api/movies.ts'
import type { Movie } from '../api/types.ts'

export function useMovieFeed() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const pageRef = useRef(0)
  const totalPagesRef = useRef<number | null>(null)
  const loadingRef = useRef(false)

  const loadNext = useCallback(async () => {
    if (loadingRef.current) {
      return
    }
    if (
      totalPagesRef.current !== null &&
      pageRef.current >= totalPagesRef.current
    ) {
      setHasMore(false)
      return
    }

    loadingRef.current = true
    setIsLoading(true)
    setError(null)

    try {
      const data = await listMovies(pageRef.current + 1, MOVIE_PAGE_SIZE)
      pageRef.current = data.page
      totalPagesRef.current = data.total_pages
      setHasMore(data.total_pages > 0 && data.page < data.total_pages)
      setMovies((current) => mergeMovies(current, data.movies))
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : 'Failed to load movies'
      setError(message)
    } finally {
      loadingRef.current = false
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadNext()
  }, [loadNext])

  return { movies, error, isLoading, hasMore, loadNext }
}

function mergeMovies(current: Movie[], incoming: Movie[]): Movie[] {
  const seen = new Set(current.map((movie) => movie.id))
  const extra = incoming.filter((movie) => !seen.has(movie.id))
  return extra.length === 0 ? current : [...current, ...extra]
}
