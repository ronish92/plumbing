import axiosInstance from "@/lib/axios";

export interface LoginPayload {
  username: string;
  password: string;
}

export const login = async (data: LoginPayload) => {
  const response = await axiosInstance.post(
    "/api/access/api/login",
    data
  );

  return response.data;
};