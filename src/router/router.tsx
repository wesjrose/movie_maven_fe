import { createBrowserRouter } from 'react-router'
import { HomePage } from '../pages/HomePage.tsx'
import { MovieDetailPage } from '../pages/MovieDetailPage.tsx'
import { MoviesPage } from '../pages/MoviesPage.tsx'
import { NotFoundPage } from '../pages/NotFoundPage.tsx'
import { AppLayout } from './AppLayout.tsx'
import { RouteErrorPage } from './RouteErrorPage.tsx'

/**
 * Route tree — the single place that maps URLs to pages.
 *
 * This app uses React Router **Data Mode** (createBrowserRouter +
 * RouterProvider). Official docs:
 *   Routing:     https://reactrouter.com/start/data/routing
 *   Navigation:  https://reactrouter.com/start/data/navigating
 *   Route APIs:  https://reactrouter.com/start/data/route-object
 *
 * How to add a page
 * -----------------
 * 1. Create a component in `src/pages/`.
 * 2. Add a helper in `src/router/paths.ts` if the URL will be linked to.
 * 3. Add a route object in the `children` array below.
 * 4. Add a <NavLink> in `AppLayout` only if it belongs in the header.
 *
 * Patterns used here
 * ------------------
 * - Layout route (`AppLayout`): no extra URL segment; children render in
 *   its <Outlet />. The header stays mounted across page changes.
 * - Index route (`index: true`): the page at the parent's URL (`/`).
 * - Prefix route (`path: "movies"` with no Component): groups URLs under
 *   `/movies` without wrapping them in another layout.
 * - Dynamic segment (`:movieId`): available in the page via useParams().
 * - Splat (`*`): catch-all 404. Still inside AppLayout so the nav remains.
 *
 * Data loading (when you wire the API)
 * ------------------------------------
 * Add a `loader` next to `Component`. It runs before the page renders:
 *
 *   {
 *     index: true,
 *     Component: MoviesPage,
 *     loader: async () => {
 *       const response = await fetch("/api/movies")
 *       if (!response.ok) throw new Response("Failed to load movies", { status: 500 })
 *       return response.json()
 *     },
 *   }
 *
 * Read the result in the page with `useLoaderData()`. Vite proxies `/api`
 * to the Go backend (see vite.config.ts).
 */
export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, Component: HomePage },
      {
        path: 'movies',
        children: [
          { index: true, Component: MoviesPage },
          { path: ':movieId', Component: MovieDetailPage },
        ],
      },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
