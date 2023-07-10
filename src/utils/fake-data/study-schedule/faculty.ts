import { faker } from "@faker-js/faker/locale/ru";
import { getRandomArbitrary } from "@utils/styles/helpers";
import { v4 } from "uuid";
import {
  IDepartmentEntity,
  IFacultyDepartmentDetailEntity,
  IFacultyEntity,
} from "@domain/entity/study-schedule/index";

export const createDepartment = (
  faculty_id: Id = v4(),
  id: Id = v4(),
): IDepartmentEntity => ({
  id,
  faculty_id,
  name: faker.name.jobTitle(),
});
export const createDepartmentList = (faculty_id: Id): IDepartmentEntity[] =>
  Array.from(Array(getRandomArbitrary(1, 5))).map((_, index) =>
    createDepartment(faculty_id, index),
  );

export const createFaculty = (id: Id = v4()): IFacultyEntity => {
  const obj = {
    id,
    name: faker.commerce.productName(),
  };

  return {
    ...obj,
    departments: createDepartmentList(obj.id),
  };
};

export const createFacultyList = (): IFacultyEntity[] => [
  createFaculty(1),
  createFaculty(2),
  createFaculty(3),
  createFaculty(4),
  createFaculty(5),
  createFaculty(6),
  createFaculty(7),
  createFaculty(8),
];

export const createDetailDepartment = (
  departmentId: Id = v4(),
): IFacultyDepartmentDetailEntity => {
  const faculty = createFaculty(1);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete faculty.departments;

  return {
    ...faculty,
    department: createDepartment(1, departmentId),
  };
};
