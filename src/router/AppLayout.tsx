import { NavLink, Outlet } from 'react-router'
import { paths } from './paths.ts'

/**
 * Persistent chrome for every page: header, nav, and the <Outlet />
 * where the matched child route renders.
 *
 * Nested routing docs:
 * https://reactrouter.com/start/data/routing#nested-routes
 */
export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to={paths.home} className="brand">
          Movie Maven
        </NavLink>
        <nav className="app-nav" aria-label="Primary">
          {/* `end` keeps Home inactive on nested paths like /movies */}
          <NavLink to={paths.home} end>
            Home
          </NavLink>
          <NavLink to={paths.movies}>Movies</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
