import { TPaginationBase } from "@domain/app";
import {
  ISubjectEntity,
  TLoadSubjectParams,
  TSubjectNew,
} from "@domain/entity/study-schedule";
import { apiRootRequest } from "@domain/utils/request";

export class StudyScheduleSubjectApi {
  async createSubject(
    subject: TSubjectNew & {
      isAddInAllDepartments: boolean;
    },
    parentId?: Id,
  ): Promise<ISubjectEntity> {
    const response = await apiRootRequest.post(`/v1/admin/subjects`, {
      name: subject.name,
      parent_id: parentId,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      set_for_all: subject.isAddInAllDepartments,
    });

    return response.data;
  }

  async editSubject(
    subject: ISubjectEntity,
    parentId?: Id,
  ): Promise<ISubjectEntity> {
    const response = await apiRootRequest.put(
      `/v1/admin/subjects/${subject.id}`,
      {
        subjectId: subject.id,
        parent_id: parentId,
        name: subject.name,
      },
    );

    return response.data;
  }

  async deleteSubject(subjectId: Id): Promise<Id> {
    await apiRootRequest.delete(`/v1/admin/subjects/${subjectId}`);
    return subjectId;
  }

  async getSubjects(
    params: TLoadSubjectParams,
  ): Promise<TPaginationBase<ISubjectEntity[]>> {
    const { data: subjects } = await apiRootRequest.get("/v1/admin/subjects", {
      params: {
        parent_id: params.parentId,
        page: params.page,
      },
    });

    return subjects;
  }

  async searchSubjects(query: string): Promise<ISubjectEntity[]> {
    return (
      await apiRootRequest.get("/v1/admin/subject/search", {
        params: {
          search: query,
        },
      })
    ).data;
  }
}
