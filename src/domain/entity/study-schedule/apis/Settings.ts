import { TPaginationBase, TPaginationParams } from "@domain/app";
import {
  TModeCreateAction,
  TSettingLesson,
  TSettingsMode,
} from "@domain/entity/study-schedule";
import { apiRootRequest } from "@domain/utils/request";

export class StudyScheduleSettingsApi {
  async getModes(
    params: TPaginationParams,
  ): Promise<TPaginationBase<TSettingsMode[]>> {
    const { data: modes } = await apiRootRequest.get<
      TPaginationBase<TSettingsMode[]>
    >("/v1/admin/schedule_settings", {
      params: {
        page: params.page,
      },
    });

    modes.data = modes.data.map((item: any) => ({
      ...item,
      lessons: item.schedule_setting_items,
    }));

    return modes;
  }

  async updateMode(mode: Partial<TSettingsMode>): Promise<TSettingsMode> {
    const response = await apiRootRequest.put<TSettingsMode>(
      `/v1/admin/schedule_settings/${mode.id}`,
      mode,
    );

    return {
      ...response.data,
      lessons: response.data.schedule_setting_items as TSettingLesson[],
    };
  }

  async deleteMode(modeId: Id): Promise<Id> {
    await apiRootRequest.delete(`/v1/admin/schedule_settings/${modeId}`);
    return modeId;
  }

  async renameMode(mode: Partial<TSettingsMode>): Promise<TSettingsMode> {
    const response = await apiRootRequest.put<TSettingsMode>(
      `/v1/admin/schedule_settings/${mode.id}`,
      mode,
    );

    return {
      ...response.data,
      lessons: response.data.schedule_setting_items as TSettingLesson[],
    };
  }

  async createMode(mode: TModeCreateAction): Promise<TSettingsMode> {
    const response = await apiRootRequest.post<TSettingsMode>(
      "/v1/admin/schedule_settings",
      {
        name: mode.name,
        count: mode.lessonCount,
      },
    );

    return {
      ...response.data,
      lessons: response.data.schedule_setting_items as TSettingLesson[],
    };
  }
}
