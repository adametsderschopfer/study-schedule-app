import React from "react";
import {
  StyledCardLoaderBody,
  StyledCardLoaderHead,
} from "@ui/skeletons/components/card/styled";
import { TextLoader } from "@ui/skeletons/components/TextLoader";
import { SkeletonBox } from "@ui/skeletons/SkeletonBox";

export const CardLoader: React.FC = () => {
  return (
    <SkeletonBox width={348} height={260}>
      <StyledCardLoaderHead>
        <SkeletonBox width={136} height={15} />
        <SkeletonBox width={15} height={15} />
      </StyledCardLoaderHead>

      <StyledCardLoaderBody>
        <div>
          <TextLoader width={210} />
          <TextLoader width={180} />
          <TextLoader width={70} />
        </div>

        <TextLoader width={150} height={25} />
      </StyledCardLoaderBody>
    </SkeletonBox>
  );
};
