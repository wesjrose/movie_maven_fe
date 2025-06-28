import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/app/hooks/axios/useAxios";

interface GetMoviesParams {
  page?: number;
}

export const useQueryMovies = (params: GetMoviesParams) => {
  const { page } = params;

  const axios = useAxios();

  const handleRequest = () => {
    return axios
      .get("movie/movies", {
        params: {
          page,
        },
      })
      .then((response) => {
        return response?.data?.movies ?? response;
      });
  };

  return useQuery({ queryKey: ["movies"], queryFn: handleRequest });
};
