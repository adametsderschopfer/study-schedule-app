import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledHeaderTitle = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 40px;

  color: ${theme.colors.grayText};
`;

export const StyledHeaderButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-left: auto;
`;
