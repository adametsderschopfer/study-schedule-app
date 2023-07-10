import styled from "styled-components";
import { SkeletonBox } from "@ui/skeletons/SkeletonBox";

export const StyledCardLoaderHead = styled(SkeletonBox)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 56px;
  padding: 18px 20px;
  width: 100%;
`;

export const StyledCardLoaderBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  height: 100%;
`;
