import { Movie } from "@/lib/interface/movie";
import { MovieCard } from "@/components/custom/movie-card/movie-card";

interface MovieGridProps {
  movies?: Movie[];
  ref: any;
}

export const MovieGrid = ({ movies, ref }: MovieGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {movies?.map((movie, index) => {
        if (movies.length === index + 1) {
          return (
            <MovieCard
              key={movie.id}
              poster={movie.poster_url}
              title={movie.title}
              year={movie.year}
              ref={ref}
            ></MovieCard>
          );
        } else {
          return (
            <MovieCard
              key={movie.id}
              poster={movie.poster_url}
              title={movie.title}
              year={movie.year}
            ></MovieCard>
          );
        }
      })}
    </div>
  );
};
