import React from "react";
import { StyledLoaderIndicator } from "@ui/components/loader-indicator";
import {
  StyledPageLoader,
  StyledPageLoaderText,
} from "@ui/components/page-loader/styled";

export const PageLoader: React.FC<{ text?: string | null }> = (props) => {
  return (
    <StyledPageLoader>
      <StyledLoaderIndicator />

      {props.text && <StyledPageLoaderText>{props.text}</StyledPageLoaderText>}
    </StyledPageLoader>
  );
};
