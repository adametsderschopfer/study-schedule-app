import * as React from "react";
import { ComponentPropsWithoutRef } from "react";
import { RemoveButtonProps } from "@ui/components/remove-button/RemoveButton";

export interface DropdownMenuItem {
  name: string;
  component?: React.ComponentType<any> | string;
  props?: ComponentPropsWithoutRef<"button"> | RemoveButtonProps;
}

export type DropdownMenuPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface DropdownMenuProps {
  items: DropdownMenuItem[];
  position?: DropdownMenuPosition;

  triggerBg?: string;
  triggerSpanBg?: string;
  triggerSpanBgHover?: string;
}
