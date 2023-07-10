import { theme } from "@config/theme";
import styled, { StyledComponentPropsWithRef } from "styled-components";
import { StyledLoaderIndicator } from "@ui/components/loader-indicator/index";

export const StyledSelectWrapper = styled.div<{ isWide: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;

  width: ${(props): string => (props.isWide ? "100%" : "auto")};
`;

const getSelectBorderColor = (props: {
  isOnlyText?: boolean;
  isValid?: boolean;
}): string | undefined => {
  if (props.isOnlyText) {
    return "transparent";
  }

  if (!props.isValid) {
    return theme.colors.error;
  }

  return theme.colors.ultraLightGray;
};

export const StyledSelect = styled.div<{ isWide?: boolean }>`
  width: ${(props): string => (props.isWide ? "100%" : "auto")};
  display: flex;
  flex-direction: column;

  position: relative;
`;

export const StyledSelectInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;

  cursor: default;

  width: 100%;
  height: 100%;
  color: ${theme.colors.grayText};

  &::placeholder {
    color: ${theme.colors.grayTextLight};
  }
`;

export const StyledSelectContainer = styled.div<{
  isOnlyText?: boolean;
  isValid?: boolean;
}>`
  padding: ${(props): string | undefined =>
    props.isOnlyText ? "0" : "0 17px"};
  background-color: #ffffff;

  height: ${theme.control.height}px;
  box-shadow: none;
  outline: none !important;
  border: 1px solid ${getSelectBorderColor};
  border-radius: 2px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & ${StyledLoaderIndicator} {
    width: 10px;
    height: 10px;
    margin-left: 15px;
  }

  &:hover {
    border-color: ${getSelectBorderColor};
  }
`;

export const StyledSelectArrowWrapper = styled.div`
  width: ${theme.control.height};
  height: ${theme.control.height};

  margin-left: 10px;

  svg {
    color: #d1d2d3;
  }
`;

export const StyledSelectOptions = styled.div<
  { isShown: boolean } & StyledComponentPropsWithRef<"div">
>`
  max-height: 250px;
  min-width: 190px;
  padding: 8px 0;
  width: auto;

  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(61, 92, 109, 0.1);

  display: flex;
  flex-direction: column;

  position: absolute;
  top: 100%;
  left: 0;
  z-index: 5;

  opacity: ${(props): number => (props.isShown ? 1 : 0)};
  pointer-events: ${(props): string => (props.isShown ? "all" : "none")};
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0;
  }
`;

export const StyledSelectLoader = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  & ${StyledLoaderIndicator} {
    width: 25px;
    height: 25px;
  }
`;

export const StyledSelectOption = styled.div<{ isActive: boolean }>`
  color: ${theme.colors.grayText};
  padding: 9px 25px;
  user-select: none;
  cursor: pointer;
  word-break: break-word;

  &:not(.select__option--is-selected):hover {
    background-color: ${theme.colors.grayMenuItemBg};
  }

  ${(props): string =>
    props.isActive
      ? `
        color: #000000;
        background-color: transparent;
        position: relative;
    
        &:after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 5px;
          background-color: ${theme.colors.primary};
        }
  `
      : ""}
`;
