import { TPaginationBase, TPaginationParams } from "@domain/app";
import {
  ITeacherEntity,
  TLoadTeachersParams,
  TTeacherEdit,
  TTeacherNew,
} from "@domain/entity/study-schedule";
import { apiRootRequest } from "@domain/utils/request";

export class StudyScheduleTeacherApi {
  async addTeacher(teacher: TTeacherNew): Promise<ITeacherEntity> {
    const response = await apiRootRequest.post("/v1/admin/teachers", {
      ...teacher,
      parent_id: teacher.parentId,
    });

    return response.data;
  }

  async editTeacher(teacher: TTeacherEdit): Promise<ITeacherEntity> {
    const response = await apiRootRequest.put(
      `/v1/admin/teachers/${teacher.id}`,
      { ...teacher, parent_id: teacher.parentId },
    );

    return response.data;
  }

  async deleteTeacher(teacherId: Id): Promise<Id> {
    await apiRootRequest.delete(`/v1/admin/teachers/${teacherId}`);
    return teacherId;
  }

  async getTeachers(
    params: TLoadTeachersParams,
  ): Promise<TPaginationBase<ITeacherEntity[]>> {
    const { data: teachers } = await apiRootRequest.get("/v1/admin/teachers", {
      params: {
        page: params.page,
        parent_id: params.parentId,
      },
    });

    return teachers;
  }

  async getAllTeachers(
    params: TPaginationParams,
  ): Promise<TPaginationBase<ITeacherEntity[]>> {
    const { data: teachers } = await apiRootRequest.get("/v1/client/teachers", {
      params: {
        page: params.page,
      },
    });

    return teachers;
  }

  async searchTeachers(query: string): Promise<ITeacherEntity[]> {
    return (
      await apiRootRequest.get("/v1/admin/teacher/search", {
        params: {
          search: query,
        },
      })
    ).data;
  }
}
