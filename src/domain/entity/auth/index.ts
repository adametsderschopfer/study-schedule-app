import { IDefaultStoreStructure } from "@domain/store";

export interface LoginFormFields {
  email: string;
  password: string;
}

export type LoginStore = IDefaultStoreStructure;
