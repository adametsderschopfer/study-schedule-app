import { theme } from "@config/theme";
import styled from "styled-components";
import { LangSwitcherItemProps } from "@ui/components/lang/lang-switcher/types";

export const StyledLangSwitcherWrapper = styled.div`
  display: flex;
  align-items: center;

  width: auto;
  padding: 10px;
`;

export const StyledLangSwitcherItem = styled.button<LangSwitcherItemProps>`
  color: ${(props): string =>
    props.isActive ? theme.colors.primary : theme.colors.grayTextLight};

  border: none;
  background: none;

  text-transform: uppercase;
  cursor: ${(props): string => (props.isActive ? "default" : "pointer")};

  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  padding: 0;
  transition: 200ms;

  &:not(:last-of-type) {
    margin: 0 20px 0 0;
  }

  &:hover {
    opacity: ${(props): number => (props.isActive ? 1 : 0.7)};
  }
`;
