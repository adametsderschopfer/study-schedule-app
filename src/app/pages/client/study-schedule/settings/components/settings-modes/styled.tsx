import { theme } from "@config/theme";
import styled, { StyledComponentPropsWithRef } from "styled-components";
import InfiniteScroll from "react-infinite-scroller";

export const StyledSettingsModesWrapper = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

export const StyledSettingsModesItems = styled.div<
  StyledComponentPropsWithRef<"div">
>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  width: 100%;
`;

export const StyledSettingsModesItemWrapper = styled.div<{ isActive: boolean }>`
  background-color: ${(props): string =>
    props.isActive ? theme.colors.primary : "#ffffff"};
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;

  box-shadow: 0 4px 20px rgba(61, 92, 109, 0.1);
  border-radius: 2px;

  &:not(:last-of-type) {
    margin-bottom: 25px;
  }
`;

export const StyledSettingsModesItem = styled.div<{ isActive: boolean }>`
  width: 100%;

  font-size: 24px;
  line-height: 26px;
  font-weight: 500;
  word-break: break-word;
  color: ${(props): string =>
    !props.isActive ? theme.colors.primary : "#ffffff"};

  outline: none;
  border: none;
  transition: 200ms;

  text-align: left;
  cursor: pointer;

  padding: 24px;
`;
