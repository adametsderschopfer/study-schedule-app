import { faker } from "@faker-js/faker/locale/ru";
import { v4 } from "uuid";
import { ITeacherEntity } from "@domain/entity/study-schedule/index";

export const createTeacher = (id: Id = v4()): ITeacherEntity => {
  return {
    id,
    department_id: v4(),
    degree: faker.commerce.department(),
    full_name: faker.name.fullName(),
    position: faker.name.jobType(),
  };
};

export const createTeachers = (): ITeacherEntity[] => [
  createTeacher(1),
  createTeacher(2),
  createTeacher(3),
  createTeacher(4),
  createTeacher(5),
  createTeacher(6),
  createTeacher(7),
  createTeacher(8),
  createTeacher(9),
  createTeacher(10),
  createTeacher(11),
];
