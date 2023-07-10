import { Link } from "react-router-dom";
import { IUser } from "@domain/entity/user";
import { Roles } from "@domain/roles";

export type TMenuItem = {
  title?: string;
  icon?: JSX.Element;

  langVariable?: string;
  linkTo: string;
  conditionFn?(user: IUser): boolean | undefined;
};

export type TMenuCategory = {
  title?: string;
  langVariable?: string;
  linkTo?: string;
  linkArgs?: Partial<typeof Link>;
  isNativeAnchor?: boolean;
  list?: TMenuItem[];

  roleAccess?: Roles[] | never[];
  conditionFn?(user: IUser): boolean | undefined;
};
