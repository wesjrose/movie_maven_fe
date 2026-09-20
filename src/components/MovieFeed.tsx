import { useEffect, useRef } from 'react'
import { useGenres } from '../hooks/useGenres.ts'
import { useMovieFeed } from '../hooks/useMovieFeed.ts'
import { MovieCard } from './MovieCard.tsx'

export function MovieFeed() {
  const { movies, error, isLoading, hasMore, loadNext } = useMovieFeed()
  const genresById = useGenres()
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasMore || error) {
      return
    }

    const node = sentinelRef.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void loadNext()
        }
      },
      { rootMargin: '280px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [error, hasMore, loadNext, movies.length])

  if (!isLoading && movies.length === 0 && error) {
    return (
      <div className="feed-status">
        <p role="alert">{error}</p>
        <button type="button" className="retry-button" onClick={() => void loadNext()}>
          Try again
        </button>
      </div>
    )
  }

  if (!isLoading && movies.length === 0) {
    return <p className="feed-status">No movies in the catalog yet.</p>
  }

  return (
    <>
      <ol className="movie-feed">
        {movies.map((movie, index) => (
          <li key={movie.id}>
            <MovieCard movie={movie} genresById={genresById} priority={index < 2} />
          </li>
        ))}
      </ol>
      <div ref={sentinelRef} className="feed-sentinel" aria-hidden="true" />
      <div className="feed-status" aria-live="polite">
        {error ? (
          <>
            <p role="alert">{error}</p>
            <button
              type="button"
              className="retry-button"
              onClick={() => void loadNext()}
            >
              Try again
            </button>
          </>
        ) : null}
        {isLoading ? <p>Loading movies…</p> : null}
        {!hasMore && !isLoading && !error ? (
          <p>That is the end of the catalog.</p>
        ) : null}
      </div>
    </>
  )
}
