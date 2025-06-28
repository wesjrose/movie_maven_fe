"use client";
import path from "path";
import React, { useEffect, useState, useCallback } from "react";
import { useAxios } from "@/app/hooks/axios/useAxios";
import { useQueryMovies } from "./api/movies/useQueryMovies";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Movie } from "@/lib/interface/movie";
import { MovieGrid } from "@/components/custom/movie-grid/movie_grid";
import { useInView } from "react-intersection-observer";

const fetchMoviesFromApi = async (page: number): Promise<any> => {
  const axios = useAxios();
  return axios
    .get("movie/movies", {
      params: {
        page: page,
      },
    })
    .then((response) => {
      return response?.data ?? response;
    });
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recPage, setRecPage] = useState<number>(1);
  const { ref, inView } = useInView({
    threshold: 0.9,
  });

  const {
    data: newMoviesData,
    isLoading: isLoadingMovies,
    isSuccess: fetchMoviesSuccess,
    isFetching: isFetchingMoreMovies,
    isError: isErrorMovies,
    error: moviesError,
  } = useQueryMovies({
    page: recPage,
  });

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

  useEffect(() => {
    if (fetchMoviesSuccess && newMoviesData) {
      console.log("data before parsing", newMoviesData);
      setLoading(true);
      const parsedMovies: Movie[] = newMoviesData.map((movie: any) => ({
        id: String(movie.id),
        title: movie.title,
        year: movie.year,
        poster_url: movie.poster_url,
        description: movie.overview,
      }));
      setMovies((movies) => [...movies, ...parsedMovies]);
      setLoading(false);
    }
  }, [
    fetchMoviesSuccess,
    newMoviesData,
    isErrorMovies,
    moviesError,
    isLoadingMovies,
  ]);

  // useEffect(() => {
  //   if (movies) {
  //     console.log(movies);
  //   }
  // }, [movies]);

  useEffect(() => {
    if (
      (inView &&
        !isLoadingMovies &&
        fetchMoviesSuccess &&
        newMoviesData.length > 0,
      !loading)
    ) {
      console.log("setting recPage: ", recPage + 1);
      setRecPage(recPage + 1);
    }
  }, [inView, isFetchingMoreMovies, fetchMoviesSuccess, newMoviesData]);

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
                <MovieGrid movies={movies}></MovieGrid>
              </TabsContent>
              <TabsContent value="recommended-movies">
                This is where users can view recommended movies
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <div ref={ref} className="text-center p-4">
        {isFetchingMoreMovies && <p>Loading more movies...</p>}
        {!isFetchingMoreMovies && !isLoadingMovies && movies.length > 0 && (
          // You might want to add a trigger here if no more data is expected or an explicit "Load More" button
          <p>Scroll down for more or (Reached end of results for now)</p>
        )}
      </div>
    </div>
  );
}
