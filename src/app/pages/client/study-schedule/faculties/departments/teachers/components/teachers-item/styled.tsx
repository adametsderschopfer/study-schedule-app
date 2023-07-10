import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledTeacherItem = styled.div`
  position: relative;
  background-color: #ffffff;
  min-height: 80px;
  border-bottom: 1px dashed ${theme.colors.grayLine};

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledTeacherItemLineElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 24px;
  height: 100%;

  color: ${theme.colors.grayText};
  font-size: 20px;
  line-height: 32px;

  word-break: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const StyledTeacherItemLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 100%;
  width: 100%;

  & ${StyledTeacherItemLineElement} {
    width: calc(100% / 3);
  }
`;

export const StyledTeacherItemLineElementPrimary = styled(
  StyledTeacherItemLineElement,
)`
  color: ${theme.colors.primary};
`;

export const StyledTeacherItemDropdownMenu = styled.div`
  width: 50px;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin-right: 5px;
`;
