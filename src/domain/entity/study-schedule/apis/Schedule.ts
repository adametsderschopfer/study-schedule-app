import {
  IScheduleApiResult,
  IScheduleEntity,
  IScheduleItem,
  TLoadSchedulesParams,
  TScheduleInputs,
} from "@domain/entity/study-schedule/index";
import { apiRootRequest } from "@domain/utils/request";

export class StudyScheduleScheduleApi {
  private getAllSchedules(
    params: TLoadSchedulesParams,
  ): Promise<IScheduleApiResult> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (fulfilled, reject) => {
      const result: IScheduleApiResult = {
        data: [],
        repeatabilities: [],
      };
      let currentPage = 1;

      if (params) {
        delete params["page"];
      }

      try {
        while (currentPage != -1) {
          const { data: responseData } = await apiRootRequest.get(
            "/v1/admin/schedules",
            {
              params: {
                ...params,
                page: currentPage,
              },
            },
          );

          if (!responseData.data.length) {
            currentPage = -1;
            break;
          }

          result.data = [...result.data, ...responseData.data];
          result.repeatabilities = [
            ...result.repeatabilities,
            ...responseData.includes.repeatabilities,
          ];

          currentPage += 1;
        }

        fulfilled(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getSchedules(
    params: TLoadSchedulesParams,
  ): Promise<IScheduleApiResult> {
    return await this.getAllSchedules(params);
  }

  async exportSchedulesToCsv(params: TLoadSchedulesParams): Promise<Blob> {
    return (
      await apiRootRequest.get("/v1/admin/schedules_export", {
        params,
        responseType: "blob",
      })
    ).data;
  }

  async createSchedule(schedule: TScheduleInputs): Promise<IScheduleItem> {
    const response = await apiRootRequest.post<IScheduleItem>(
      "/v1/admin/schedules",
      schedule,
    );

    return response.data;
  }

  async editSchedule(schedule: IScheduleEntity): Promise<IScheduleItem> {
    const response = await apiRootRequest.put<IScheduleItem>(
      `/v1/admin/schedules/${schedule.id}`,
      schedule,
    );

    return response.data;
  }

  async deleteSchedule(scheduleId: Id): Promise<Id> {
    await apiRootRequest.delete(`/v1/admin/schedules/${scheduleId}`);
    return scheduleId;
  }
}
