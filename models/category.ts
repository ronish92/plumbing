import axiosClient from "@/helper/axios-client";
import { ResponseModel } from "./response";

export interface ICategory {

  id: string;
  name: string;
  fileList: string[];

};

export const GetAllCategory = async (): Promise<ResponseModel<ICategory[]>> => {
  const response = await axiosClient.get<ResponseModel<ICategory[]>>(
    "api/LandingData/GetCategory"
  );

  return response.data;
};