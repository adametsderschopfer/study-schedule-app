import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledCheckboxInput = styled.input`
  display: none;
`;

export const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`;

export const StyledCheckboxIcon = styled.div<{ isChecked: boolean }>`
  margin-right: 15px;
  width: 22px;
  height: 20px;

  position: relative;
  border: 2px solid
    ${(props): string =>
      props.isChecked ? theme.colors.primary : theme.colors.grayBorder};

  &:after {
    content: "";

    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    width: 12px;
    height: 12px;

    background-color: ${(props): string =>
      props.isChecked ? theme.colors.primary : "transparent"};
  }
`;

export const StyledCheckboxText = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: ${theme.colors.grayText};
  width: 100%;
`;

export const StyledCheckboxField = styled.div`
  margin-bottom: 30px;
`;
