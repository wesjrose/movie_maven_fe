"use client";
import path from "path";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useAxios } from "@/app/hooks/axios/useAxios";
import { useMoviesInfinite } from "./api/movies/useQueryMoviesInfinite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Movie } from "@/lib/interface/movie";
import { MovieGrid } from "@/components/custom/movie-grid/movie_grid";
import { useInView } from "react-intersection-observer";

// const fetchMoviesFromApi = async (page: number): Promise<any> => {
//   const axios = useAxios();
//   return axios
//     .get("movie/movies", {
//       params: {
//         page: page,
//       },
//     })
//     .then((response) => {
//       return response?.data ?? response;
//     });
// };

export default function Home() {
  const [movies, setMovies] = useState<Movie[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const [recPage, setRecPage] = useState<number>(1);
  const { ref, inView } = useInView({
    threshold: 0.9,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useMoviesInfinite();

  const lastMovieElementRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>(null);
  const handleObserver = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );
  //@ts-ignore
  const allMovies = data?.pages.flatMap((page) => page.movies) || [];
  // const getMovies = useCallback(async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const { movies: rawMovies } = await fetchMoviesFromApi(recPage);

  //     // Parse and map the raw data to the Movie interface
  //     const parsedMovies: Movie[] = rawMovies.map((movie: any) => ({
  //       id: String(movie.id),
  //       title: movie.title,
  //       year: movie.year,
  //       poster_url: movie.poster_url,
  //       description: movie.overview,
  //     }));
  //     setMovies(parsedMovies);
  //   } catch (err: any) {
  //     console.error("Failed to fetch or parse movies:", err);
  //     setError(err.message || "An unknown error occurred.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (movies) {
  //     console.log(movies);
  //   }
  // }, [movies]);

  console.log("the response from movies data is: ", data);

  return (
    <div>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">Hello world</div>
          <div className="lg:col-span-3">
            <Tabs defaultValue="all-movies">
              <TabsList>
                <TabsTrigger value="all-movies">All Movies</TabsTrigger>
                <TabsTrigger value="recommended-movies">
                  Your Movies
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all-movies">
                <MovieGrid movies={allMovies} ref={handleObserver}></MovieGrid>
              </TabsContent>
              <TabsContent value="recommended-movies">
                This is where users can view recommended movies
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
