import type { ChangeEvent } from 'react'

type GenreFilterProps = {
  genresById: Map<number, string>
  selectedGenreId: number | null
  onChange: (genreId: number | null) => void
}

export function GenreFilter({ genresById, selectedGenreId, onChange }: GenreFilterProps) {
  const genres = [...genresById.entries()]
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name))

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    onChange(value === '' ? null : Number(value))
  }

  return (
    <div className="genre-filter">
      <label htmlFor="genre-filter-select">Genre</label>
      <select
        id="genre-filter-select"
        value={selectedGenreId ?? ''}
        onChange={handleChange}
        disabled={genres.length === 0}
      >
        <option value="">All genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  )
}
