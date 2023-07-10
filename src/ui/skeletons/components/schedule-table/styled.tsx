import { theme } from "@config/theme";
import styled from "styled-components";
import { SkeletonBox } from "@ui/skeletons/SkeletonBox";

export const StyledScheduleTableWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const StyledScheduleTableRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const StyledScheduleTableHead = styled(StyledScheduleTableRow)`
  height: 50px;
`;

export const StyledScheduleTableBody = styled(StyledScheduleTableRow)`
  height: 100px;
`;

export const StyledScheduleTableItem = styled(SkeletonBox)`
  width: 100%;
  height: 100%;
  border: 1px solid ${theme.colors.ultraLightGray};

  padding: 15px;
`;
