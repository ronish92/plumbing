"use server";

import axiosInstance from "@/helper/axios-instance";
import { ResponseModel } from "@/models/response";


interface IUserTrackerRequest {
  visitorId: string
  source: string
}

export const InsertUserTracker = async (formdata: IUserTrackerRequest) => {
  const response = (await axiosInstance.post(
    "/LandingData/InsertUserTracker/",
    formdata
  )) as ResponseModel;
  return response;
};

export const GetUserTrackerCount = async () => {
  const response = (await axiosInstance.get(
    "/LandingData/UserTrackerCount" 
  )) as ResponseModel;
  return response;
}