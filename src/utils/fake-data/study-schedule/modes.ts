import { faker } from "@faker-js/faker/locale/ru";
import {
  TSetting,
  TSettingsMode,
  TSettingsModeLesson,
} from "@domain/entity/study-schedule/index";

export const createMockLesson = (): TSettingsModeLesson => {
  return {
    time_start: "08:00",
    time_end: "08:45",
  };
};

export const createSettingMock = (id = 0): TSetting => ({
  id,
  name: faker.name.jobTitle(),
});

export const createMockMode = (modeId = 0): TSettingsMode => {
  return {
    ...createSettingMock(modeId),

    lessons: [
      createMockLesson(),
      createMockLesson(),
      createMockLesson(),
      createMockLesson(),
      createMockLesson(),
      createMockLesson(),
    ],
  };
};

export const createMockModes = (): TSettingsMode[] => {
  return [
    createMockMode(1),
    createMockMode(2),
    createMockMode(3),
    createMockMode(4),
    createMockMode(5),
    createMockMode(6),
    createMockMode(7),
    createMockMode(8),
    createMockMode(9),
  ];
};
