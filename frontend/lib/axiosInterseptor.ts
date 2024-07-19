import axios from "axios";
import { useSession } from "next-auth/react";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const AxiosClient = () => {
  const defaultOptions = {
    baseURL,
  };

  const axiosInstance = axios.create(defaultOptions);

  axiosInstance.interceptors.request.use(async (request) => {
    const { data: session } = useSession();

    if (session) {
      request.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return request;
  });

  return axiosInstance;
};

export default AxiosClient();
