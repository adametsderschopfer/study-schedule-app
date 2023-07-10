import { TPaginationBase } from "@domain/app";
import {
  IBuildingEntity,
  TBuildingLoadParams,
} from "@domain/entity/study-schedule";
import { apiRootRequest } from "@domain/utils/request";

export class StudyScheduleBuildingApi {
  async addNewBuilding(
    building: Omit<IBuildingEntity, "id">,
  ): Promise<IBuildingEntity> {
    const response = await apiRootRequest.post(`/v1/admin/buildings`, building);
    return response.data;
  }

  async editBuilding(building: IBuildingEntity): Promise<IBuildingEntity> {
    const response = await apiRootRequest.put(
      `/v1/admin/buildings/${building.id}`,
      building,
    );

    return response.data;
  }

  async deleteBuilding(buildingId: Id): Promise<Id> {
    await apiRootRequest.delete(`/v1/admin/buildings/${buildingId}`);
    return buildingId;
  }

  async getBuildings(
    params: TBuildingLoadParams,
  ): Promise<TPaginationBase<IBuildingEntity[]>> {
    const response = await apiRootRequest.get("/v1/admin/buildings", {
      params: {
        page: params.page,
      },
    });

    return response.data;
  }
}
