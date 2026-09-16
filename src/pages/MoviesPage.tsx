import { Link } from 'react-router'
import { paths } from '../router/paths.ts'

/**
 * Catalog list. Later this page will fetch GET /movies through a route
 * loader (see comments in `src/router/router.tsx`).
 *
 * The example link below exists so you can click through to a nested
 * `:movieId` route without the API being wired yet.
 */
export function MoviesPage() {
  return (
    <article className="page">
      <h1>Movies</h1>
      <p>
        The catalog will list titles from the Movie Maven backend. Until
        then, this is a placeholder so the <code>/movies</code> route is
        ready to fill in.
      </p>
      <ul className="card-list">
        <li>
          <Link to={paths.movieDetail('example')}>
            Example movie detail
            <small>Opens /movies/example — a nested dynamic route</small>
          </Link>
        </li>
      </ul>
    </article>
  )
}
