import { AxiosResponse } from "axios";
import { IUser } from "@domain/entity/user/index";
import { apiRootRequest } from "@domain/utils/request";

export class UserApi {
  static getUser(): Promise<AxiosResponse<IUser>> {
    return apiRootRequest.get("/v2/index/me");
  }
}
