import { TPaginationBase, TPaginationParams } from "@domain/app";
import {
  IGroupEntity,
  TGroupNew,
  TLoadGroupParams,
} from "@domain/entity/study-schedule/index";
import { apiRootRequest } from "@domain/utils/request";

export class StudyScheduleGroupApi {
  async getGroupById(groupId: Id): Promise<IGroupEntity> {
    const response = await apiRootRequest.get(`/v1/admin/groups/${groupId}`);
    return response.data;
  }

  async getGroups(
    params: TLoadGroupParams,
  ): Promise<TPaginationBase<IGroupEntity[]>> {
    const { data: groups } = await apiRootRequest.get("/v1/admin/groups", {
      params: {
        parent_id: params.parentId,
        page: params.page,
      },
    });

    return groups;
  }

  async getAllGroups(
    params: TPaginationParams,
  ): Promise<TPaginationBase<IGroupEntity[]>> {
    const { data: groups } = await apiRootRequest.get("/v1/admin/groups", {
      params: {
        page: params.page,
      },
    });

    return groups;
  }

  async deleteGroup(groupId: Id): Promise<Id> {
    await apiRootRequest.delete(`/v1/admin/groups/${groupId}`);
    return groupId;
  }

  async createGroup(newGroup: TGroupNew, parentId?: Id): Promise<IGroupEntity> {
    const response = await apiRootRequest.post("/v1/admin/groups", {
      ...newGroup,
      parent_id: parentId,
    });

    return { ...response.data, department_id: newGroup.parentId };
  }

  async editGroup(group: IGroupEntity, parentId?: Id): Promise<IGroupEntity> {
    const response = await apiRootRequest.put(`/v1/admin/groups/${group.id}`, {
      ...group,
      letter: group.letter || "-",
      parent_id: parentId,
    });

    return {
      ...response.data,
      department_id: group.department_id,
    };
  }
}
