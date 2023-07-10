import { theme } from "@config/theme";
import styled from "styled-components";
import {
  Tab as DefTab,
  TabList as DefTabList,
  TabPanel as DefTabPanel,
  Tabs as DefTabs,
} from "react-tabs";

export const StyledTabs = styled(DefTabs)`
  font-family: Roboto, sans-serif;
`;

export const StyledTab = styled(DefTab)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  color: ${theme.colors.primary};
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;

  padding: 10px 15px;

  text-align: center;
  cursor: pointer;
  outline: none;

  transition: 200ms;

  &:hover:not(.react-tabs__tab--selected) {
    text-decoration: underline;
  }

  &.react-tabs__tab--selected {
    background-color: ${theme.colors.primary};
    color: #ffffff;
  }
`;

export const StyledTabList = styled(DefTabList)`
  width: 100%;

  display: flex;
  flex-direction: row;
  list-style: none;

  padding: 0;
  margin: 0;

  border: 2px solid ${theme.colors.primary};
  border-radius: 2px;
`;

export const StyledTabPanel = styled(DefTabPanel)`
  margin-top: 48px;
`;
