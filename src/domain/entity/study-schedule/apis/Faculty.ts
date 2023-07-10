import { TPaginationBase, TPaginationParams } from "@domain/app";
import {
  IDepartmentEntity,
  IFacultyDepartmentDetailEntity,
  IFacultyEntity,
} from "@domain/entity/study-schedule";
import { apiRootRequest } from "@domain/utils/request";

export class StudyScheduleFacultyApi {
  async getFaculty(facultyId: Id): Promise<IFacultyEntity> {
    const { data: responseData } = await apiRootRequest.get(
      `/v1/admin/faculties/${facultyId}`,
    );

    return responseData;
  }

  async getFaculties(
    params: TPaginationParams,
  ): Promise<TPaginationBase<IFacultyEntity[]>> {
    const { data: responseData } = await apiRootRequest.get(
      "/v1/admin/faculties",
      {
        params: {
          page: params.page,
        },
      },
    );

    return responseData;
  }

  async getAllDepartments(
    params: TPaginationParams,
  ): Promise<TPaginationBase<IDepartmentEntity[]>> {
    const { data: departments } = await apiRootRequest.get<
      TPaginationBase<IDepartmentEntity[]>
    >("/v1/admin/departments", {
      params: {
        page: params.page,
      },
    });

    return departments;
  }

  async getDepartment(departmentId: Id): Promise<IDepartmentEntity> {
    const { data: department } = await apiRootRequest.get<IDepartmentEntity>(
      `/v1/admin/departments/${departmentId}`,
    );

    return department;
  }

  async getFacultiesDepartmentInfo(
    facultyId: Id,
    departmentId: Id,
  ): Promise<IFacultyDepartmentDetailEntity> {
    const { data: faculty } = await apiRootRequest.get<IFacultyEntity>(
      `/v1/admin/faculties/${facultyId}`,
    );

    return {
      id: faculty.id,
      name: faculty.name,
      departments: faculty.departments,
      department: faculty.departments.find(
        (item) => item.id == departmentId,
      ) as IDepartmentEntity,
    };
  }

  async deleteFaculty(facultyId: Id): Promise<Id> {
    await apiRootRequest.delete(`/v1/admin/faculties/${facultyId}`);
    return facultyId;
  }

  async deleteDepartment(departmentId: Id): Promise<Id> {
    await apiRootRequest.delete(`/v1/admin/departments/${departmentId}`);
    return departmentId;
  }

  async createFaculty(name: string): Promise<IFacultyEntity> {
    const response = await apiRootRequest.post("/v1/admin/faculties", {
      name,
    });

    return response.data;
  }

  async editFaculty(faculty_id: Id, name: string): Promise<IFacultyEntity> {
    const response = await apiRootRequest.put(
      `/v1/admin/faculties/${faculty_id}`,
      {
        name,
      },
    );

    return response.data;
  }

  async createDepartment(
    faculty_id: Id,
    name: string,
  ): Promise<IDepartmentEntity> {
    const response = await apiRootRequest.post(`/v1/admin/departments/`, {
      name,
      faculty_id,
    });

    return response.data;
  }

  async editDepartment(
    faculty_id: Id,
    department_id: Id,
    name: string,
  ): Promise<IDepartmentEntity> {
    const response = await apiRootRequest.put(
      `/v1/admin/departments/${department_id}`,
      {
        name,
        faculty_id,
        department_id,
      },
    );

    return response.data;
  }
}
