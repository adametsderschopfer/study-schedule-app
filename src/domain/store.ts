import { TPaginationBase } from "@domain/app";

type TLoadingStatus = "idle" | "loading" | "still-loading" | "error";
export type TLoading = TLoadingStatus;
export type TError = Error | null;

export interface IDefaultStoreStructure<
  Pagination = Partial<TPaginationBase<unknown>>,
> {
  loading?: TLoading;
  error?: TError;

  isProcessBusy?: boolean;
  searchValue?: string;

  pagination?: Pagination;
}

export type TEditActionPayload<T = undefined> = {
  status: boolean;
  itemId?: Id;
  item?: T | undefined;
};
