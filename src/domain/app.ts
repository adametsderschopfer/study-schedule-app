import { TLoading } from "@domain/store";

export type TSortField = {
  fieldName: string;
  order: boolean | "asc" | "desc";
};

export const DATE_FORMAT = "yyyy-LL-dd";
export const USER_LS_KEY = "user";
export const I18N_CURRENT_LANGUAGE_LS_KEY = "locale";

/** FORM >> */

export interface IFormFields {
  loading?: TLoading;
  itemId?: Id;
}

export type TFormPropsBase<Entity, Inputs = Entity> = {
  defaultValues?: Partial<Inputs>;
  onRequestClose?(): void;
  onSubmit: (entity: Entity) => void;
};

/** << FORM */

export interface IModalBase extends IFormFields {
  isShown?: boolean;
}

export type TSelectData<T> = {
  label: string;
  value: T;
};

export type TPaginationParams = {
  page: number;
};

export type TPaginationBase<Entity = unknown, Includes = undefined> = {
  total: number;
  per_page: number;
  current_page: number;
  data: Entity;
  includes: Includes;
};
