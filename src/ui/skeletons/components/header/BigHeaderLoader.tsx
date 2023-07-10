import React from "react";
import { StyledBigHeaderWrapperLoader } from "@ui/skeletons/components/header/styled";
import { TextLoader } from "@ui/skeletons/components/TextLoader";
import { SkeletonBox } from "@ui/skeletons/SkeletonBox";

export const BigHeaderLoader: React.FC = () => {
  return (
    <StyledBigHeaderWrapperLoader>
      <TextLoader width={683} />
      <SkeletonBox height={25} width={450} />
      <SkeletonBox width={400} height={40} />
    </StyledBigHeaderWrapperLoader>
  );
};
