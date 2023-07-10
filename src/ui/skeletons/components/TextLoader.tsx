import styled from "styled-components";
import { SkeletonBox } from "@ui/skeletons/SkeletonBox";

export const TextLoader = styled(SkeletonBox)<{ number?: string }>`
  width: ${(props): number => props.width || 100}px;
  height: 15px;

  &:not(:last-of-type) {
    margin-bottom: 5px;
  }
`;
