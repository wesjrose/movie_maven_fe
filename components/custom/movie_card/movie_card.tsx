import { Movie } from "@/lib/interface/movie";
import "./movie_card.scss";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="group relative movie-card rounded-x1 overflow-hidden hover: boarder-primary/20 transition-all duration-300 hover:shadow-1g hover:shadow-primary/5">
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <img src={movie.poster_url}></img>
      </div>
    </div>
  );
};
