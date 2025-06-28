// hooks/useMoviesInfinite.ts or similar
import { useInfiniteQuery } from "@tanstack/react-query";
import { Movie } from "@/lib/interface/movie";

// interface Movie {
//   id: number;
//   title: string;
//   // ... other movie properties
// }

interface MoviesPage {
  movies?: Movie[];
  next_page?: number; // Or nextCursor: string | null
}

const fetchMovies = async ({ pageParam = 1 }): Promise<MoviesPage> => {
  // Replace with your actual backend API endpoint
  const response = await fetch(
    `http://127.0.0.1:8000/movie/movies?page=${pageParam}`
  ); // Example with page number pagination
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
};

export function useMoviesInfinite() {
  return useInfiniteQuery<MoviesPage, Error, MoviesPage, string[], number>({
    queryKey: ["movies-inf"], // Unique key for your infinite query
    queryFn: fetchMovies,
    initialPageParam: 1, // The initial page number or cursor
    getNextPageParam: (lastPage, allPages) => {
      // Return the pageParam for the next page, or undefined if no more pages
      // Based on your backend response, determine if there's a next page
      if (lastPage.next_page) {
        return lastPage.next_page;
      }
      // If your API returns a cursor:
      // if (lastPage.nextCursor) {
      //   return lastPage.nextCursor;
      // }
      return undefined; // No more pages
    },
  });
}
