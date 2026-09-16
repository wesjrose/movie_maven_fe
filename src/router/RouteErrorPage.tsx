import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { paths } from './paths.ts'

/**
 * Shown when a route loader/action throws or a render error bubbles up.
 * Attached via `errorElement` on the root route in `./router.tsx`.
 *
 * https://reactrouter.com/start/data/route-object#errorElement
 */
export function RouteErrorPage() {
  const error = useRouteError()

  let heading = 'Something went wrong'
  let detail = 'An unexpected error occurred.'

  if (isRouteErrorResponse(error)) {
    heading = `${error.status} ${error.statusText}`
    if (typeof error.data === 'string' && error.data) {
      detail = error.data
    }
  } else if (error instanceof Error) {
    detail = error.message
  }

  return (
    <article className="page">
      <h1 className="error-title">{heading}</h1>
      <p>{detail}</p>
      <p>
        <Link to={paths.home}>Back to home</Link>
      </p>
    </article>
  )
}
