import { Link, useParams } from 'react-router'
import { paths } from '../router/paths.ts'

/**
 * Dynamic segment example.
 *
 * The `:movieId` token in the route tree is read with useParams().
 * https://reactrouter.com/start/data/routing#dynamic-segments
 */
export function MovieDetailPage() {
  const { movieId } = useParams()

  return (
    <article className="page">
      <h1>Movie</h1>
      <p>
        Route param <code>movieId</code>: <code>{movieId}</code>
      </p>
      <p className="muted">
        This page will show catalog details for a single movie once the
        list endpoint is connected.
      </p>
      <p>
        <Link to={paths.movies}>Back to movies</Link>
      </p>
    </article>
  )
}
