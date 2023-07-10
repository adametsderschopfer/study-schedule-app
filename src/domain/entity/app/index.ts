import { IDefaultStoreStructure, TLoading } from "@domain/store";

export interface IAppStore extends IDefaultStoreStructure {
  pageLoading: TLoading;
  isActionLoading: boolean;
}
