"use server";

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import https from "https";
import { cookies } from "next/headers";

import {
  DeleteAllCookieWeb,
  SetCookieWeb,
} from "@/actions/auth/authCookie";

export const baseUrl = process.env.API_BASE_URL;


const getHttpsAgent = () => {
  if (process.env.NODE_ENV === "development") {
    return new https.Agent({ rejectUnauthorized: false });
  }
  return undefined; 
};

const commonConfig = {
  baseURL: baseUrl,
  timeoutErrorMessage: "Server Timed out !!!",
  withCredentials: true,
  httpsAgent: getHttpsAgent(),
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(commonConfig);
const refreshAxios = axios.create(commonConfig);

// Keep track of an active refresh promise to prevent concurrent race conditions on the server
let activeRefreshPromise: Promise<any> | null = null;

axiosInstance.interceptors.request.use(
  async (request: InternalAxiosRequestConfig) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {

    return response.data;
  },

  async (error: AxiosError) => {
    const response = error.response;
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!response) {
      throw error;
    }

    if (
      response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // If another simultaneous request is already refreshing, wait for it instead of starting a new one
        if (!activeRefreshPromise) {
          activeRefreshPromise = (async () => {
            const cookieStore = await cookies();
            const accessToken = cookieStore.get("token")?.value;
            const refreshToken = cookieStore.get("refreshToken")?.value;

            if (!refreshToken) {
              throw new Error("No refresh token found");
            }

            const refreshResponse = await refreshAxios.post("refresh-token", {
              accessToken,
              refreshToken,
            });

            // Handle standard Axios shape from refreshAxios (which doesn't unwrap data)
            const refreshData = refreshResponse.data;

            if (!refreshData?.status || !refreshData.data?.token) {
              throw new Error("Invalid refresh token response structure");
            }

            await SetCookieWeb(refreshData.data);
            return refreshData.data.token;
          })();
        }

      
        const newToken = await activeRefreshPromise;
        activeRefreshPromise = null; // Reset lock on success

    
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

       
        const retryResponse = await axios(originalRequest);
        return retryResponse.data;

      } catch (refreshError) {
        activeRefreshPromise = null; // Reset lock on error
        await DeleteAllCookieWeb();
        throw refreshError;
      }
    }

    throw error;
  }
);

export default axiosInstance;
