import { MovieFeed } from '../components/MovieFeed.tsx'

export function MoviesPage() {
  return (
    <section className="page movies-page">
      <h1>Movies</h1>
      <MovieFeed />
    </section>
  )
}
