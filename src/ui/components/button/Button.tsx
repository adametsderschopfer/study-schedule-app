import React from "react";
import {
  StyledButton,
  StyledButtonHideContent,
  StyledButtonLoader,
} from "@ui/components/button/styled";
import { IButtonProps } from "@ui/components/button/types";

export const Button: React.FC<IButtonProps> = (props) => {
  return (
    <StyledButton
      {...props}
      onClick={(event): void => {
        if (props.onClick) {
          props.onClick(event);
        }

        event.stopPropagation();
      }}>
      {props.isLoading && <StyledButtonLoader isInvertColor={true} />}

      <StyledButtonHideContent isHide={!!props.isLoading}>
        {props.children}
      </StyledButtonHideContent>
    </StyledButton>
  );
};

Button.defaultProps = {
  mode: "normal",
  isOutline: false,
};
