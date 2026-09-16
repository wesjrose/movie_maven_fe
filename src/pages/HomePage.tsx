import { Link } from 'react-router'
import { paths } from '../router/paths.ts'

export function HomePage() {
  return (
    <article className="page">
      <h1>Movie Maven</h1>
      <p>
        Browse the local catalog of movies ingested from TMDB.
      </p>
      <p>
        <Link to={paths.movies}>Open the movie catalog</Link>
      </p>
    </article>
  )
}
