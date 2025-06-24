import { Movie } from "@/lib/interface/movie";
import { MovieCard } from "@/components/custom/movie-card/movie-card";

interface MovieGridProps {
  movies: Movie[];
}

export const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          poster={movie.poster_url}
          title={movie.title}
          year={movie.year}
        ></MovieCard>
      ))}
    </div>
  );
};
