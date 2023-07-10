import { theme } from "@config/theme";
import styled, { css } from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const StyledSidebarMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledSidebarMenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledSidebarMenuSubList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const linkStyle = css`
  background-color: ${theme.colors.primary};
  width: 100%;

  border: none;

  color: #ffffff;
  font-size: 20px;
  line-height: 22px;
  font-weight: 500;

  padding-left: ${theme.indents.container.large.horizontal}px;
  padding-top: 13px;
  padding-bottom: 13px;

  margin-bottom: 15px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  span {
    transition: 200ms;
  }

  &:hover span {
    transform: translateX(20px);
  }

  &.action {
    cursor: pointer;
  }
`;

export const StyledSidebarMenuCategory = styled(Link)`
  ${linkStyle}
`;

export const StyledSidebarMenuCategoryNative = styled.a`
  ${linkStyle}
`;

export const StyledSidebarMenuItem = styled(NavLink)`
  background-color: transparent;
  width: 100%;

  border: none;
  cursor: pointer;

  color: ${theme.colors.grayText};
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;

  padding-left: ${theme.indents.container.large.horizontal}px;
  padding-top: 13px;
  padding-bottom: 13px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  transition: 300ms;

  svg {
    margin-right: 10px;
  }

  &:hover:not(.active) {
    background-color: ${theme.colors.grayMenuItemBg};
  }

  &.active {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.grayMenuItemBg};
  }
`;
