import { theme } from "@config/theme";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const StyledHeaderMenuList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const StyledHeaderMenuItem = styled(NavLink)`
  font-weight: 400;
  line-height: 22px;
  font-size: 20px;

  color: ${theme.colors.grayText};

  &.active {
    color: ${theme.colors.primary};
    font-weight: 500;
  }

  &:not(:last-of-type) {
    margin-right: 80px;
  }
`;
