"use server";

import axiosInstance from "@/helper/axios-instance";
import { ICompany } from "@/models/comany";
import { ResponseModel } from "@/models/response";

export const GetAllCompany = async () => {
  const response = (await axiosInstance.get(
    "/api/Common/GetAllCompany"
  )) as ResponseModel;
  return response;
};

export const GetCompanyDetails = async (id: number) => {
  const response = (await axiosInstance.get(
    "/api/Common/GetCompanyById/" + id
  )) as ResponseModel;
  return response;
};

export const CreateCompany = async (data: ICompany) => {
  const response = (await axiosInstance.post(
    "/api/Common/CreateCompany",
    data
  )) as ResponseModel;
  return response;
};


