import { IDefaultStoreStructure } from "../../store";

export enum Role {
  Administrator = "Administrator",
  Client = "Client",
}

export interface IUserStore extends IDefaultStoreStructure {
  data: IUser;
  isAuthorized: boolean;
}

export interface IUser {
  email: string;
  name: string;
  firstName: string;
  role: Role | never;
  languages?: string;
  lat?: string;
  lng?: string;
  availableHotelServices?: string[];
  availableSignageServices?: string[];
  availableTimezones?: string[];
  availableLanguages?: string[];
  panelOrder?: string;
  id: string;
  token: string;

  isStudyScheduleEnabled?: boolean;
  isDigitalDirectoryEnabled?: boolean;
  isDigitalSignageEnabled?: boolean;
  isInfoPanelEnabled?: boolean;
  isQuickRestoEnabled?: boolean;
}
