import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledSubjectCounter = styled.div`
  display: inline;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: ${theme.colors.grayText};
  white-space: nowrap;
  margin-right: 30px;
`;

export const StyledSubjectCounterText = styled.div`
  display: inline;
`;

export const StyledSubjectCounterCount = styled.div`
  display: inline;
  color: ${theme.colors.primary};
`;
