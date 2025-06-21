import { Movie } from "@/lib/interface/movie";

interface MovieGridProps {
  movies: Movie[];
}

export const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-2 lg:grid-cols-3 xl:grid-cols-4"></div>
  );
};
