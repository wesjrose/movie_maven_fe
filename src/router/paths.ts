/**
 * Canonical URL helpers for this app.
 *
 * Prefer `paths.movies` (or `paths.movieDetail(id)`) over string literals
 * in <Link>, <NavLink>, and navigate() calls. That way a path rename is
 * one change, and TypeScript flags leftover hardcoded URLs if you update
 * the helper signature.
 *
 * Keep this file in sync with the route tree in `./router.tsx`.
 */
export const paths = {
  home: '/',
  movies: '/movies',
  movieDetail: (movieId: string | number) => `/movies/${movieId}`,
} as const
