import React from "react";
import { LineItemLoader } from "@ui/skeletons/components/line-item/LineItemLoader";
import {
  StyledLineItemListColumn,
  StyledLineItemListGroup,
} from "@ui/skeletons/components/line-item/styled";

export const LineItemListLoader: React.FC = () => {
  return (
    <StyledLineItemListGroup>
      <StyledLineItemListColumn>
        <LineItemLoader />
        <LineItemLoader />
        <LineItemLoader />
        <LineItemLoader />
        <LineItemLoader />
        <LineItemLoader />
      </StyledLineItemListColumn>
      <StyledLineItemListColumn>
        <LineItemLoader />
        <LineItemLoader />
        <LineItemLoader />
        <LineItemLoader />
        <LineItemLoader />
        <LineItemLoader />
      </StyledLineItemListColumn>
    </StyledLineItemListGroup>
  );
};
