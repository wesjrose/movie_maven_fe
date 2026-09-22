import { useEffect, useState } from 'react'
import { fetchGenres } from '../api/genres.ts'

type GenresById = Map<number, string>

// Module-level cache so /populate-genres (which re-ingests from TMDB) is
// only ever called once per page load, no matter how many components ask.
let genresPromise: Promise<GenresById> | null = null

function loadGenres(): Promise<GenresById> {
  if (!genresPromise) {
    genresPromise = fetchGenres()
      .then(
        (data) =>
          new Map(
            data.genres
              .filter((genre) => genre.media_type === 'movie')
              .map((genre) => [genre.id, genre.name]),
          ),
      )
      .catch((cause) => {
        genresPromise = null
        throw cause
      })
  }
  return genresPromise
}

export function useGenres() {
  const [genresById, setGenresById] = useState<GenresById>(new Map())

  useEffect(() => {
    let cancelled = false
    loadGenres()
      .then((data) => {
        if (!cancelled) {
          setGenresById(data)
        }
      })
      .catch(() => {
        // Genre names are decorative; movies still render without them.
      })
    return () => {
      cancelled = true
    }
  }, [])

  return genresById
}
