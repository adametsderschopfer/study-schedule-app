import styled from "styled-components";
import { SkeletonBox } from "@ui/skeletons/SkeletonBox";

export const StyledLineItemWrapper = styled(SkeletonBox)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
  margin-bottom: 20px;

  max-width: 728px;
  width: 100%;
`;

export const StyledLineItemListGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledLineItemListColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
`;

export const StyledLineItemIconLeft = styled(SkeletonBox)`
  margin-right: 15px;
  width: 35px;
  height: 35px;
`;

export const StyledLineItemIconRight = styled(SkeletonBox)`
  margin-right: 15px;
  width: 20px;
  height: 20px;
`;
