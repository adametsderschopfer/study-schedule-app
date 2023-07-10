import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledControlRow = styled.div<{
  isLast?: boolean;
  isIndentDisabled?: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${(props): number =>
    props.isIndentDisabled
      ? 0
      : props.isLast
      ? theme.input.inputBottomIndentLast
      : theme.input.inputBottomIndent}px;

  & > div,
  > button {
    &:not(:last-of-type) {
      margin-right: ${theme.control.indentRight}px;
    }
  }
`;

export const StyledControlLabel = styled.label`
  margin-bottom: 5px;
  line-height: 22px;
  font-size: 16px;
  color: ${theme.colors.grayText};
`;
