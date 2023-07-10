import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledSubjectItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  min-height: 96px;
  width: 49%;
  padding: 13px 0 13px 24px;

  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(61, 92, 109, 0.1);
  border-radius: 2px;

  margin-bottom: 32px;

  word-break: break-word;
`;

export const StyledSubjectItemName = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: ${theme.colors.grayText};

  word-break: break-word;
`;

export const StyledSubjectItemDropdownButton = styled.div``;
