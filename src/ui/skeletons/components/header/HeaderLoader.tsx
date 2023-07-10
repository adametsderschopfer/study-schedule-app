import React from "react";
import {
  StyledHeaderRow,
  StyledHeaderSearch,
  StyledHeaderWrapperLoader,
} from "@ui/skeletons/components/header/styled";
import { SkeletonBox } from "@ui/skeletons/SkeletonBox";

export const HeaderLoader: React.FC = () => {
  return (
    <StyledHeaderWrapperLoader>
      <SkeletonBox width={180} height={30} />

      <StyledHeaderRow>
        <StyledHeaderSearch width={300} height={48} />
        <SkeletonBox width={200} height={48} />
      </StyledHeaderRow>
    </StyledHeaderWrapperLoader>
  );
};
