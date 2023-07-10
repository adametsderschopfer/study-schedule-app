import { faker } from "@faker-js/faker/locale/ru";
import { v4 } from "uuid";
import { ISubjectEntity } from "@domain/entity/study-schedule/index";

export const createSubject = (subjectId: Id = v4()): ISubjectEntity => ({
  id: subjectId,
  department_id: v4(),
  name: faker.name.jobTitle(),
});

export const createSubjectList = (): ISubjectEntity[] => [
  createSubject(0),
  createSubject(1),
  createSubject(2),
  createSubject(3),
  createSubject(4),
  createSubject(5),
  createSubject(6),
  createSubject(7),
  createSubject(8),
  createSubject(9),
];
