import { faker } from "@faker-js/faker/locale/ru";
import { createTeacher } from "@utils/fake-data/study-schedule/teachers";
import { getEnumValues } from "@utils/helper";
import { v4 } from "uuid";
import {
  EFormsOfEducation,
  ELevelsOfEducation,
  ESubGroupList,
  IGroupEntity,
} from "@domain/entity/study-schedule/index";

export const createGroupMock = (id = v4()): IGroupEntity => {
  const teacher = createTeacher(1);

  return {
    id,
    department_id: 0,
    name: faker.company.name(),
    sub_group: faker.datatype.number({
      min: 2,
      max: getEnumValues(ESubGroupList).length,
    }),
    degree: faker.datatype.number({
      min: 1,
      max: getEnumValues(ELevelsOfEducation).length,
    }),
    letter: "a",
    year_of_education: faker.datatype.number({
      min: 1,
      max: 4,
    }),
    form_of_education: faker.datatype.number({
      min: 1,
      max: getEnumValues(EFormsOfEducation).length,
    }),
    teacher_id: teacher.id,
    teacher,
  };
};

export const createGroupListMock = (): IGroupEntity[] => [
  createGroupMock(),
  createGroupMock(),
  createGroupMock(),
  createGroupMock(),
  createGroupMock(),
  createGroupMock(),
  createGroupMock(),
  createGroupMock(),
  createGroupMock(),
  createGroupMock(),
];
