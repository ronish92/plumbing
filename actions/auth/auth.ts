"use server";

import axiosInstance from "@/helper/axios-instance";
import { ChangePasswordModel, ResetPasswordModel, loginModel } from "@/models/auth/login";
import { ResponseModel } from "@/models/response";
import { SetCookieWeb } from "./authCookie";
import { cookies } from "next/headers";

export const PostLogin = async (data: loginModel) => {
  const response = (await axiosInstance.post("login", {
    username: data.username,
    password: data.password,
      ...(data.employeecode && {
    employeecode: data.employeecode,
  }),
  })) as ResponseModel;
  if (response?.status) {
    await SetCookieWeb(response.data);
  }
  return response;
};

export const VerifyEmail = async (email: string, currentUrl: string) => {
  const response = (await axiosInstance.post("verify-email-send", {
    email: email,
    url: currentUrl,
  })) as ResponseModel;
  return response;
};

export const ConfirmEmail = async (
  userId: string,
  code: string,
  tenant: string
) => {
  const response = (await axiosInstance.post(
    "confirm-email",
    {
      userId: userId,
      code: code,
    },
    {
      headers: {
        tenant: tenant,
      },
    }
  )) as ResponseModel;
  return response;
};

export const ForgotPassword = async (email: string, currentUrl: string) => {
  const response = (await axiosInstance.post("forgot-password", {
    email: email,
    url: currentUrl,
  })) as ResponseModel;
  return response;
};

export const ResetPassword = async (
  formData: ResetPasswordModel,
  tenant: string
) => {
  const response = (await axiosInstance.post("reset-password", formData, {
    headers: {
      tenant: tenant,
    },
  })) as ResponseModel;
  return response;
};

export const ChangePasswordAction = async (formData: ChangePasswordModel) => {
  const response = (await axiosInstance.post("change-password", formData)) as ResponseModel;
  return response;
};


export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return !!token;
}

