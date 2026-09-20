import { useSearchParams } from 'react-router'
import { GenreFilter } from '../components/GenreFilter.tsx'
import { MovieFeed } from '../components/MovieFeed.tsx'
import { useGenres } from '../hooks/useGenres.ts'

const GENRE_PARAM = 'genre'

export function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const genresById = useGenres()

  const genreIdParam = searchParams.get(GENRE_PARAM)
  const genreId = genreIdParam ? Number(genreIdParam) : null

  const handleGenreChange = (nextGenreId: number | null) => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        if (nextGenreId === null) {
          next.delete(GENRE_PARAM)
        } else {
          next.set(GENRE_PARAM, String(nextGenreId))
        }
        return next
      },
      { replace: true },
    )
  }

  return (
    <section className="page movies-page">
      <h1>Movies</h1>
      <GenreFilter
        genresById={genresById}
        selectedGenreId={genreId}
        onChange={handleGenreChange}
      />
      <MovieFeed key={genreId ?? 'all'} genreId={genreId} genresById={genresById} />
    </section>
  )
}
