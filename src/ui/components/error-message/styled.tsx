import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledErrorMessageText = styled.div`
  line-height: 16px;
  font-size: 12px;
  margin-top: 5px;

  position: absolute;
  top: 100%;
  left: 0;

  color: ${theme.colors.error};
`;

export const StyledErrorText = styled.div`
  color: ${theme.colors.error};
`;
