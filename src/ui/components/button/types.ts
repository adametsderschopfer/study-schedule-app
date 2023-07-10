import { ComponentPropsWithoutRef } from "react";

type TMode = "wide" | "normal";

export interface IButtonProps extends ComponentPropsWithoutRef<"button"> {
  mode?: TMode;
  isOutline?: boolean;
  isLoading?: boolean;
  activeColor?: string;
}
