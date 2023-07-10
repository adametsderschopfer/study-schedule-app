import React from "react";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { StyledErrorMessageText } from "@ui/components/error-message/styled";
import { StyledControlLabel } from "@ui/components/layout/Control";
import { StyledSelectWrapper } from "@ui/components/select/styled";
import { SelectProps } from "@ui/components/select/types";

export const SelectBase: React.FC<SelectProps> = (props: any) => {
  const isValid = typeof props.isValid === "boolean" ? props.isValid : true;

  return (
    <StyledSelectWrapper isWide={props.isWide}>
      {props.label && <StyledControlLabel>{props.label}</StyledControlLabel>}

      <ErrorBoundary>{props.children}</ErrorBoundary>

      {!isValid && props.errorMessage && (
        <StyledErrorMessageText>{props.errorMessage}</StyledErrorMessageText>
      )}
    </StyledSelectWrapper>
  );
};
