import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledUserProfileBarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  width: auto;
`;

export const StyledUserProfileBarIcon = styled.div`
  color: ${theme.colors.primary};
  display: flex;
`;

export const StyledUserProfileBarEmail = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 22px;
  margin-right: 15px;

  color: ${theme.colors.primary};
`;
