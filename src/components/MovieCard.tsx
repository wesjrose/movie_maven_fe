import type { Movie } from '../api/types.ts'
import {
  movieGenreNames,
  moviePosterSrcSet,
  moviePosterUrl,
  movieReleaseDateLabel,
  movieVoteRounded,
} from '../lib/movie.ts'

type MovieCardProps = {
  movie: Movie
  genresById: Map<number, string>
  priority?: boolean
}

export function MovieCard({ movie, genresById, priority = false }: MovieCardProps) {
  const posterUrl = moviePosterUrl(movie.poster_path)
  const posterSrcSet = moviePosterSrcSet(movie.poster_path)
  const releasedOn = movieReleaseDateLabel(movie.release_date)
  const rating = movieVoteRounded(movie.vote_average)
  const genreNames = movieGenreNames(movie.genre_ids, genresById)

  return (
    <article className="movie-card">
      {posterUrl ? (
        <img
          className="movie-card__poster"
          src={posterUrl}
          srcSet={posterSrcSet ?? undefined}
          sizes="(min-width: 960px) 928px, 100vw"
          alt=""
          width={500}
          height={750}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          loading={priority ? 'eager' : 'lazy'}
        />
      ) : (
        <div className="movie-card__poster movie-card__poster--empty" />
      )}
      <div className="movie-card__body">
        <h2 className="movie-card__title">{movie.title}</h2>
        <p className="movie-card__meta">
          {releasedOn ? (
            <time className="movie-card__date" dateTime={movie.release_date ?? undefined}>
              {releasedOn}
            </time>
          ) : null}
          <span
            className="movie-card__rating"
            aria-label={`Rated ${rating} out of 10`}
          >
            {rating}
          </span>
        </p>
        {genreNames.length > 0 ? (
          <ul className="movie-card__genres">
            {genreNames.map((name) => (
              <li key={name} className="movie-card__genre">
                {name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}
