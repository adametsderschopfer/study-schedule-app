import styled from "styled-components";
import { SkeletonBox } from "@ui/skeletons/SkeletonBox";

export const StyledHeaderWrapperLoader = styled(SkeletonBox)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100px;
  padding: 25px;
  margin-bottom: 25px;
`;

export const StyledBigHeaderWrapperLoader = styled(StyledHeaderWrapperLoader)`
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 180px;
`;

export const StyledHeaderSearch = styled(SkeletonBox)`
  margin-right: 35px;
`;

export const StyledHeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
