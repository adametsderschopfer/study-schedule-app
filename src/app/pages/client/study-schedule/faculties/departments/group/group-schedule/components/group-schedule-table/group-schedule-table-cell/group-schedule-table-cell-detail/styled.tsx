import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledScheduleCellDetail = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  z-index: 10;
`;

export const StyledScheduleCellDetailContainer = styled.div`
  background-color: #ffffff;
  width: 500px;
  box-shadow: 0 4px 20px rgba(61, 92, 109, 0.1);
  border-radius: 2px;

  display: flex;
  flex-direction: column;
`;

export const StyledScheduleCellDetailHead = styled.div`
  background-color: ${theme.colors.primary};
  height: 56px;
  padding-left: 23px;

  display: flex;
  align-items: center;
`;

export const StyledScheduleCellDetailHeadDate = styled.div`
  text-transform: capitalize;
  margin-right: auto;

  font-size: 20px;
  line-height: 14px;

  color: #ffffff;
`;

export const StyledScheduleCellDetailHeadTime = styled.div`
  font-size: 18px;
  line-height: 32px;
  color: #ffffff;
`;

export const StyledScheduleCellDetailHeadDropdown = styled.div`
  margin-left: 10px;
  margin-right: 3px;
`;

export const StyledScheduleCellDetailBody = styled.div`
  padding: 24px;
`;

export const StyledScheduleCellDetailBodyLecture = styled.div`
  color: ${theme.colors.grayText};
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 24px;
`;

export const StyledScheduleCellDetailBodyField = styled.div`
  display: flex;
  font-size: 14px;
  line-height: 14px;
  margin-bottom: 8px;
  color: ${theme.colors.grayText};
`;
