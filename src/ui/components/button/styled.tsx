import { theme } from "@config/theme";
import styled from "styled-components";
import { IButtonProps } from "@ui/components/button/types";
import { StyledLoaderIndicator } from "@ui/components/loader-indicator/index";

export const StyledButtonLoader = styled(StyledLoaderIndicator)`
  width: 20px;
  height: 20px;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%) rotateZ(45deg);
`;

export const StyledButton = styled.button<IButtonProps>`
  background-color: ${(props): string =>
    props.isOutline ? "transparent" : theme.colors.button.background};
  color: ${(props): string =>
    props.isOutline ? theme.colors.primary : theme.colors.button.text};

  width: ${(props): string => {
    switch (props.mode) {
      case "wide": {
        return "100%";
      }

      default: {
        return "auto";
      }
    }
  }};

  border-radius: 2px;
  padding: 12px 40px;

  position: relative;

  text-align: center;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props): string =>
    props.isOutline ? `${theme.colors.primary}` : "transparent"};
  cursor: pointer;

  font-weight: 500;
  font-size: 20px;
  line-height: 22px;

  transition: all 300ms;

  &:active {
    transform: scale(0.95);
  }

  &:not(:hover) ${StyledButtonLoader}:after {
    color: ${theme.colors.primary};
  }

  &:hover {
    background: ${(props): string =>
      props.isOutline
        ? props.activeColor || theme.colors.button.background
        : "transparent"};
    border-color: ${(props): string =>
      props.isOutline
        ? "transparent"
        : props.activeColor || theme.colors.primary};
    color: ${(props): string =>
      !props.isOutline ? theme.colors.primary : theme.colors.button.text};
  }
`;

export const StyledButtonHideContent = styled.div<{
  isHide: boolean;
}>`
  opacity: ${(props): string => (props.isHide ? "0" : "1")};
`;
