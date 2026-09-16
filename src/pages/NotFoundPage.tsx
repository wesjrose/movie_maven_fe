import { Link } from 'react-router'
import { paths } from '../router/paths.ts'

export function NotFoundPage() {
  return (
    <article className="page">
      <h1>Page not found</h1>
      <p>That URL does not match any route in the app.</p>
      <p>
        <Link to={paths.home}>Back to home</Link>
      </p>
    </article>
  )
}
