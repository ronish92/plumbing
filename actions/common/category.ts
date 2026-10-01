"use server";


import axiosInstance from "@/helper/axios-instance";
import { ICategory } from "@/models/category";

import { ResponseModel } from "@/models/response";


export const GetAllCategories = async () => {
    const response = (await axiosInstance.get(
      "/api/Category/GetAllCategory"
    )) as ResponseModel;
    return response;
  };
  
  export const GetCategory = async (id: number) => {
    const response = (await axiosInstance.get(
      "/api/Category/GetCategoryById/" + id
    )) as ResponseModel;
    return response;
  };
  
  export const CreateCategory = async (data: ICategory) => {
    const response = (await axiosInstance.post(
      "/api/Category/CreateCategory",
      data)) as ResponseModel;
    return response;
  };
  
  export const DeleteCategory = async (id: number) => {
    const response = (await axiosInstance.get(
      "/consultancy/Expenses/DeleteExpenses/" + id
    )) as ResponseModel;
    return response;
  };
  