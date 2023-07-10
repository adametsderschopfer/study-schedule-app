import { faker } from "@faker-js/faker/locale/ru";
import { v4 } from "uuid";
import { IUser, Role } from "@domain/entity/user/index";

export const createMockUser = (): IUser => {
  return {
    id: v4(),
    role: Role.Client,
    email: faker.internet.email(),
    token: faker.random.words(10),
    name: faker.name.firstName(),
    firstName: faker.name.firstName(),
  };
};
