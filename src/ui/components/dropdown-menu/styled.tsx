import { theme } from "@config/theme";
import styled from "styled-components";
import { DropdownMenuPosition } from "@ui/components/dropdown-menu/types";

type TCommonProps = {
  isOpened?: boolean;

  position?: DropdownMenuPosition;

  triggerBg?: string;
  triggerSpanBg?: string;
  triggerSpanBgHover?: string;
};

function calcDropdownPosition(
  prop: "top" | "bottom" | "left" | "right",
  position?: DropdownMenuPosition,
): string {
  if (!position) {
    return "0";
  }

  function returnValueByProp(
    propsValues: Record<typeof prop, number | string>,
  ): string {
    const value = propsValues[prop];

    if (typeof value === "string") {
      return value;
    }

    return value + "px";
  }

  switch (position) {
    case "bottom-left": {
      return returnValueByProp({
        top: "100%",
        right: "50%",
        bottom: "unset",
        left: "unset",
      });
    }

    case "bottom-right": {
      return returnValueByProp({
        top: "100%",
        right: "unset",
        bottom: "unset",
        left: "50%",
      });
    }

    case "top-left": {
      return returnValueByProp({
        top: "unset",
        right: "50%",
        bottom: "100%",
        left: "unset",
      });
    }

    case "top-right": {
      return returnValueByProp({
        top: "unset",
        right: "unset",
        bottom: "100%",
        left: "50%",
      });
    }
  }

  return "0";
}

export const StyledDropdownMenuContainer = styled.div`
  position: relative;
`;

export const StyledDropdownMenuTrigger = styled.button<TCommonProps>`
  height: 40px;
  width: 40px;

  border-radius: 50px;
  margin: 5px;
  padding: 5px;

  background-color: transparent;
  border: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: 200ms;

  &:hover,
  &:focus {
    background-color: ${(props): string =>
      props.triggerBg || theme.colors.primary};

    span {
      background-color: ${(props): string =>
        props.triggerSpanBgHover || "#ffffff"};
    }
  }

  span {
    width: 4px;
    height: 4px;
    border-radius: 50px;
    transition: 200ms;

    background-color: ${(props): string => props.triggerSpanBg || "#afb7bc"};

    &:not(:last-of-type) {
      margin-bottom: 4px;
    }
  }
`;

export const StyledDropdownMenuList = styled.div<TCommonProps>`
  display: ${(props): string => (props.isOpened ? "flex" : "none")};

  position: absolute;

  min-width: 150px;

  top: ${(props): string => calcDropdownPosition("top", props.position)};
  bottom: ${(props): string => calcDropdownPosition("bottom", props.position)};
  left: ${(props): string => calcDropdownPosition("left", props.position)};
  right: ${(props): string => calcDropdownPosition("right", props.position)};

  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(61, 92, 109, 0.1);

  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 8px 0;

  z-index: 5;
`;

export const StyledDropdownMenuListItem = styled.div`
  background-color: #ffffff;

  width: 100%;
  border: none;
  padding: 8px 20px;

  color: ${theme.colors.grayText};
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;

  cursor: pointer;
  white-space: nowrap;
  text-align: left;

  &:hover {
    background-color: ${theme.colors.grayMenuItemBg};
  }
`;
