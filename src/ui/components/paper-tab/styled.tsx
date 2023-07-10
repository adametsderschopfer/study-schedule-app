import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledPaperTabLinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledPaperTabLink = styled("a")<{ isActiveElement: boolean }>`
  padding: 24px 0 24px 0;
  margin-right: 56px;

  color: ${theme.colors.grayText};
  font-size: 22px;
  line-height: 22px;

  border-bottom: 6px solid transparent;
  border-bottom-color: ${(props): string =>
    props.isActiveElement ? theme.colors.primary : "transparent"};

  transition: 200ms;
  cursor: pointer;

  &:hover {
    border-bottom-color: ${theme.colors.primary};
  }

  &:visited {
    color: ${theme.colors.grayText};
  }
`;
