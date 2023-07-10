import styled from "styled-components";
import { TextLoader } from "@ui/skeletons/components/TextLoader";
import { SkeletonBox } from "@ui/skeletons/SkeletonBox";

export const StyledTableTightLoader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledTableTightItem = styled(SkeletonBox)`
  width: 100%;
  height: 80px;

  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  padding: 15px;
  border-bottom: 1px dashed #d1d1d1;
`;

export const StyledTableTightText = styled(TextLoader)``;
