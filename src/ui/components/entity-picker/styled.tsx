import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledEntityPicker = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const StyledEntityPickerTrigger = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: stretch;

  cursor: pointer;

  padding: 25px 0 25px 24px;
  background-color: #ffffff;
  border-radius: 2px;
`;

export const StyledEntityPickerTriggerTitle = styled.div<{ isShown: boolean }>`
  transition: 200ms;
  user-select: none;

  font-weight: 500;
  font-size: 24px;
  line-height: 28px;

  width: 100%;

  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  color: ${theme.colors.grayText};

  ${StyledEntityPickerTrigger}:hover & {
    color: ${(props): string =>
      props.isShown ? theme.colors.primary : theme.colors.grayText};
  }
`;

export const StyledEntityPickerIcon = styled.div<{
  useInline?: boolean;
  isShown?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  background-color: ${theme.colors.primary};
  border-radius: 50px;

  transition: 100ms;

  width: 40px;
  height: 40px;

  margin-right: 16px;

  transform: rotate(
    ${(props): number => {
      if (props.useInline) {
        return 270;
      }

      return props.isShown ? 180 : 0;
    }}deg
  );
  transform-origin: center;
`;

export const StyledEntityPickerTriggerDropdownMenu = styled.div`
  margin-left: auto;
  padding: 0 5px;
`;

export const StyledEntityPickerList = styled.div<{ isShown: boolean }>`
  overflow: ${(props): string => (props.isShown ? "visible" : "hidden")};
  max-height: ${(props): string => (props.isShown ? "100%" : "0")};
  width: 100%;
`;

export const StyledEntityPickerListItem = styled.div`
  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  word-break: break-word;

  min-height: 80px;
  padding: 15px 0 15px 24px;
  width: 100%;

  cursor: pointer;
  transition: 200ms;

  &:last-of-type {
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  &:first-of-type {
    box-shadow: 0 7px 10px rgba(61, 92, 109, 0.08) inset;
  }

  &:hover {
    background-color: ${theme.colors.grayMenuItemBg};
  }
`;

export const StyledEntityPickerListItemTitle = styled.div`
  color: ${theme.colors.grayText};
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  margin-left: 60px;

  transition: 200ms;

  ${StyledEntityPickerListItem}:hover & {
    color: ${theme.colors.primary};
  }
`;

export const StyledEntityPickerListItemAddTitle = styled(
  StyledEntityPickerListItemTitle,
)`
  margin-left: 0;
`;
