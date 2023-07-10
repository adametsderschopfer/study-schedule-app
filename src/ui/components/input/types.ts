import React, { ComponentPropsWithRef, CSSProperties } from "react";
import { ReactDatePickerProps } from "react-datepicker";

export type InputProps = Omit<
  ComponentPropsWithRef<"input">,
  "onInput" | "placeholder"
> & {
  label?: string | undefined | null;
  errorMessage?: string;
  isWide?: boolean;
  isMultiline?: boolean;
  isValid?: boolean | undefined;
  icon?: JSX.Element;
  placeholder?: string | unknown;
  wrapperStyle?: CSSProperties;

  datePickerProps?: ReactDatePickerProps;

  onInput?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
};
