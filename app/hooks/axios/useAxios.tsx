import axios from "axios";
// import {backendDevUrl} from "../../constants/api/backendBaseUrl";
// import {useToken} from "../jwt/useToken";

export const useAxios = () => {
  //   const { token, triggerRefresh } = useToken();

  const axiosHttp = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });

  axiosHttp.interceptors.request.use(
    // @ts-ignore
    (config) => {
      return {
        ...config,
        headers: {},
      };

      // if (token) {
      //     return {
      //       ...config,
      //       //   headers: {
      //       //     "Authorization": 'Bearer ' + token,
      //       //     ...config.headers,
      //       //   },
      //     };
      //   } else {
      //     return Promise.reject(new Error("no access token"));
      //   }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosHttp.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosHttp;
};
