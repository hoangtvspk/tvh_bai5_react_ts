import axios, { AxiosRequestConfig } from "axios";

export const httpClient = () => {
  const axiosInstance = axios.create();
  

  return {
    get: (url: string, options?: AxiosRequestConfig) =>
      axiosInstance.get(url, { ...options }),
    post: (url: string, data: any, options?: AxiosRequestConfig) =>
      axiosInstance.post(url, data, { ...options }),
    put: (url: string, data: any, options?: AxiosRequestConfig) =>
      axiosInstance.put(url, data, { ...options }),
    delete: (url: string,  options?: AxiosRequestConfig) =>
      axiosInstance.delete(url, {  ...options }),
  };
};
