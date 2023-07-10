import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledCountChooserFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StyledCountChooserFieldLabel = styled.div`
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;

  color: ${theme.colors.grayText};
`;

export const StyledCountChooserFieldCountList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  max-width: 500px;
  width: 100%;
`;

export const StyledCountChooserFieldCountListItem = styled.button<{
  isActive: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background-color: ${(props): string =>
    props.isActive ? theme.colors.primary : theme.colors.grayMenuItemBg};
  color: ${(props): string =>
    props.isActive ? "#ffffff" : theme.colors.grayText};

  width: 32px;
  height: 32px;

  cursor: pointer;
  transition: 200ms;

  &:not(:last-of-type) {
    margin-right: 1px;
  }

  &:hover {
    background-color: ${(props): string =>
      props.isActive ? theme.colors.primary : theme.colors.lightGray};
  }

  &:active {
    background-color: ${theme.colors.primary};
    color: #ffffff;
  }
`;

export const StyledCountChooserFieldHint = styled.div`
  font-size: 12px;
  line-height: 22px;
  margin-top: 8px;

  color: ${theme.colors.grayText};
`;
