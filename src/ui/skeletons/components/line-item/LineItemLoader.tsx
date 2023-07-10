import React from "react";
import { StyledRow } from "@ui/components/layout/Row";
import {
  StyledLineItemIconLeft,
  StyledLineItemIconRight,
  StyledLineItemWrapper,
} from "@ui/skeletons/components/line-item/styled";
import { TextLoader } from "@ui/skeletons/components/TextLoader";

export const LineItemLoader: React.FC = (props) => {
  return (
    <StyledLineItemWrapper {...props} height={96}>
      <StyledRow>
        <StyledLineItemIconLeft />
        <TextLoader />
      </StyledRow>

      <StyledLineItemIconRight />
    </StyledLineItemWrapper>
  );
};
