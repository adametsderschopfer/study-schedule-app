import { TLoadStudyScheduleUserDataResponse } from "@domain/entity/study-schedule/index";
import { apiRootRequest } from "@domain/utils/request";

export class StudyScheduleRootApi {
  async getUser(): Promise<TLoadStudyScheduleUserDataResponse> {
    const response = await apiRootRequest.get("/v1/admin/me");
    return response.data;
  }
}
