import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://portfolio-server-nine-theta.vercel.app",
  withCredentials: true,
});

const useAxios = () => {
  return axiosSecure;
};

export default useAxios;
