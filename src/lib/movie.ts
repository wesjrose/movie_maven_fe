const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

export function moviePosterUrl(posterPath: string): string | null {
  if (!posterPath) {
    return null
  }
  return `${TMDB_IMAGE_BASE}/w780${posterPath}`
}

export function moviePosterSrcSet(posterPath: string): string | null {
  if (!posterPath) {
    return null
  }
  return [
    `${TMDB_IMAGE_BASE}/w342${posterPath} 342w`,
    `${TMDB_IMAGE_BASE}/w500${posterPath} 500w`,
    `${TMDB_IMAGE_BASE}/w780${posterPath} 780w`,
  ].join(', ')
}

/** Calendar date from an RFC 3339 `release_date`, or null when missing. */
export function movieReleaseDateLabel(releaseDate: string | null): string | null {
  if (!releaseDate) {
    return null
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(releaseDate)
  if (!match) {
    return null
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(Date.UTC(year, month - 1, day))
  if (Number.isNaN(date.getTime())) {
    return null
  }

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function movieVoteRounded(voteAverage: number): number {
  return Math.round(voteAverage)
}
