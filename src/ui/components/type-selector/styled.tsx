import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledTypeSelector = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 24px;
  width: 100%;
`;

export const StyledTypeSelectorWrapper = styled(StyledTypeSelector)`
  border-radius: 2px;
  border: 2px solid ${theme.colors.primary};
  width: 100%;
  margin-bottom: 0;
`;

export const StyledTypeSelectorItemTooltip = styled.div`
  position: absolute;
  top: -113%;
  left: 50%;
  transform: translateX(-50%);
  white-space: pre;
  padding: 10px 20px;
  background-color: ${theme.colors.grayMenuItemBg};
  color: #666666;
  transition: opacity 200ms;
  opacity: 0;
  border-radius: 2px;
  pointer-events: none;

  &:after {
    content: "";
    background-color: ${theme.colors.grayMenuItemBg};
    width: 16px;
    height: 16px;
    border-radius: 2px;

    position: absolute;
    top: 80%;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    z-index: -1;
  }
`;

export const StyledTypeSelectorItem = styled.div<{ isActive: boolean }>`
  position: relative;

  width: 100%;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  text-align: center;

  color: ${(props): string =>
    props.isActive ? "#ffffff" : theme.colors.primary};

  background-color: ${(props): string =>
    !props.isActive ? "#ffffff" : theme.colors.primary};

  transition: 200ms;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.primary};
    color: #ffffff;

    & ${StyledTypeSelectorItemTooltip} {
      opacity: 1;
    }
  }
`;
