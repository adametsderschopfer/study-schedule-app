import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledScheduleDisplayCell = styled.div`
  height: 160px;
  padding: 12px 16px;

  display: flex;
  flex-direction: column;
`;

export const StyledScheduleDisplayCellText = styled.div`
  color: ${theme.colors.grayText};
  margin-bottom: 4px;

  font-size: 12px;
  line-height: 16px;
  height: 16px;
  overflow: hidden;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

export const StyledScheduleDisplayCellLectureTitle = styled(
  StyledScheduleDisplayCellText,
)``;

export const StyledScheduleDisplayCellLectureText = styled(
  StyledScheduleDisplayCellText,
)`
  -webkit-line-clamp: 3;
  margin-bottom: auto;
  height: 48px;
  word-break: break-word;
`;

export const StyledScheduleDisplayCellRow = styled(
  StyledScheduleDisplayCellText,
)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 0;
`;

export const StyledScheduleDisplayCellRowText = styled(
  StyledScheduleDisplayCellText,
)`
  margin-bottom: 0;
  max-width: 100px;
`;
