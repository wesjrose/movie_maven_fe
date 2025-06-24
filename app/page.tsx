"use client";
import path from "path";
import React, { useEffect, useState, useCallback } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Movie } from "@/lib/interface/movie";
// import { MovieCard } from "@/components/custom/movie-card/movie-card";
import { MovieGrid } from "@/components/custom/movie-grid/movie_grid";

const fetchMoviesFromApi = async (): Promise<any> => {
  const response = await fetch("http://127.0.0.1:8000/movie/movies");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // @ts-ignore
  const data = await response.json();
  return data;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { movies: rawMovies } = await fetchMoviesFromApi();

      // Parse and map the raw data to the Movie interface
      const parsedMovies: Movie[] = rawMovies.map((movie: any) => ({
        id: String(movie.id),
        title: movie.title,
        year: movie.year,
        poster_url: movie.poster_url,
        description: movie.overview,
      }));
      setMovies(parsedMovies);
    } catch (err: any) {
      console.error("Failed to fetch or parse movies:", err);
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    if (movies) {
      console.log(movies);
    }
  }, [movies]);

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
    </div>
  );
}
