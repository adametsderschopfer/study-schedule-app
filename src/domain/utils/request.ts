import { LStorage } from "@utils/LStorage";
import axios from "axios";
import { USER_LS_KEY } from "@domain/app";
import { IUser } from "@domain/entity/user";

export type TDefaultResponseData = {
  isSuccess: boolean;
};

export const apiRootRequest = axios.create({
  baseURL: "/api",
  headers: {
    "content-type": "application/json",
  },
});

apiRootRequest.interceptors.request.use(function (config) {
  const user = LStorage.getItem<IUser>(USER_LS_KEY);

  if (user) {
    config.headers.token = user.token;
    config.headers["X-Account-Id"] = user.id;
  }

  return config;
});
