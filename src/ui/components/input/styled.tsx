import { theme } from "@config/theme";
import styled, { css } from "styled-components";
import { InputProps } from "@ui/components/input/types";

export const StyledInputContainer = styled.div<{ isWide?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  font-family: Roboto, sans-serif;
  width: ${(props): string => (!props.isWide ? "auto" : "100%")};
`;

export const StyledInputWrapper = styled.div<{ isWide?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  position: relative;

  width: ${(props): string => (!props.isWide ? "auto" : "100%")};
`;

const inputStyles = css<InputProps>`
  height: ${theme.control.height}px;
  width: ${(props): string => (!props.isWide ? "auto" : "100%")};

  background: #ffffff;

  color: #666666;
  line-height: 21px;

  padding: ${(props): string =>
    `14px ${props.icon ? "42px" : "18px"} 14px 18px`};

  border: 1px solid
    ${(props): string =>
      props.isValid ? theme.colors.ultraLightGray : theme.colors.error};
  border-radius: 2px;
  outline: none;

  transition: color 300ms, border-color 300ms;

  &::placeholder {
    color: ${theme.colors.grayLight};
  }

  &:hover {
    border-color: ${theme.colors.grayTextLight};
  }

  &:focus {
    border-color: ${theme.colors.grayTextLight};
  }
`;

export const StyledInput = styled.input<InputProps>`
  ${inputStyles}
`;

export const StyledTextarea = styled.textarea<InputProps>`
  resize: vertical;
  width: 100%;
  min-height: 100px;
  max-height: 400px;

  ${inputStyles}
`;

export const StyledInputIcon = styled.div`
  position: absolute;
  right: 8px;
  bottom: 8px;

  display: flex;
  align-items: center;
`;
