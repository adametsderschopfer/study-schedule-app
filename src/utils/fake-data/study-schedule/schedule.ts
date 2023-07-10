import { faker } from "@faker-js/faker/locale/ru";
import { createMockBuildingItem } from "@utils/fake-data/study-schedule/building";
import { createDepartment } from "@utils/fake-data/study-schedule/faculty";
import { createGroupMock } from "@utils/fake-data/study-schedule/group";
import {
  createMockLesson,
  createSettingMock,
} from "@utils/fake-data/study-schedule/modes";
import { createSubject } from "@utils/fake-data/study-schedule/subject";
import { createTeacher } from "@utils/fake-data/study-schedule/teachers";
import { getEnumValues } from "@utils/helper";
import { v4 } from "uuid";
import {
  EDayOfWeek,
  EScheduleRepeatability,
  EScheduleType,
  ESubGroupList,
  IScheduleItem,
} from "@domain/entity/study-schedule/index";

export const createScheduleMock = (id: Id = v4()): IScheduleItem => ({
  id,
  department_id: faker.datatype.number({
    min: 0,
    max: 5,
  }),
  group_id: 0,
  building_id: 0,
  building_classroom_id: 1,
  schedule_setting_id: 1,
  schedule_setting_item_order: faker.datatype.number({
    min: 1,
    max: 8,
  }),
  subject_id: 0,
  teacher_id: faker.datatype.number({
    min: 0,
    max: 5,
  }),
  day_of_week: faker.datatype.number({
    min: 1,
    max: getEnumValues(EDayOfWeek).length,
  }),
  repeatability: faker.datatype.number({
    min: 1,
    max: getEnumValues(EScheduleRepeatability).length - 1,
  }),
  type: faker.datatype.number({
    min: 1,
    max: getEnumValues(EScheduleType).length,
  }),
  sub_group: faker.datatype.number({
    min: 0,
    max: getEnumValues(ESubGroupList).length - 1,
  }),
  repeat_start: "2022-11-22",
  repeat_end: "2022-11-22",

  department: createDepartment(),
  schedule_setting_item: [createMockLesson()],
  schedule_setting: createSettingMock(),
  building: createMockBuildingItem(),
  group: createGroupMock(),
  subject: createSubject(),
  teacher: createTeacher(),
  building_classroom: { id: 1, name: "30-40" },
});

export const createScheduleListMock = (): IScheduleItem[] => [
  createScheduleMock(),
  createScheduleMock(),
  createScheduleMock(),
  createScheduleMock(),
  createScheduleMock(),
  createScheduleMock(),
];
