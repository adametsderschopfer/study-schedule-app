import { faker } from "@faker-js/faker/locale/ru";
import { IBuildingEntity } from "@domain/entity/study-schedule/index";

export const createMockBuildingItem = (id: Id = 0): IBuildingEntity => {
  return {
    id,
    name: faker.name.jobTitle(),
    address: faker.address.streetAddress(),
    building_classrooms: [
      { id: 1, name: "10-20" },
      { id: 2, name: "30-40" },
    ],
  };
};

export const createMockBuildingCollection = (): IBuildingEntity[] => {
  return [
    createMockBuildingItem(0),
    createMockBuildingItem(1),
    createMockBuildingItem(2),
    createMockBuildingItem(3),
    createMockBuildingItem(4),
    createMockBuildingItem(5),
    createMockBuildingItem(6),
    createMockBuildingItem(7),
    createMockBuildingItem(8),
    createMockBuildingItem(9),
    createMockBuildingItem(10),
    createMockBuildingItem(11),
  ];
};
