import { theme } from "@config/theme";
import styled from "styled-components";
import { v4 } from "uuid";
import React, { useMemo } from "react";
import { DatePicker } from "@ui/components/date-picker/DatePicker";
import { StyledDatePickerWrapper } from "@ui/components/date-picker/styled";
import { StyledErrorMessageText } from "@ui/components/error-message/styled";
import {
  StyledInput,
  StyledInputContainer,
  StyledInputIcon,
  StyledInputWrapper,
  StyledTextarea,
} from "@ui/components/input/styled";
import { InputProps } from "@ui/components/input/types";
import { StyledControlLabel } from "@ui/components/layout/Control";

export const Input: React.FC<InputProps> = React.forwardRef((props, ref) => {
  const isValid = typeof props.isValid === "boolean" ? props.isValid : true;
  const id = useMemo<string>(() => {
    return props.id || v4();
  }, [props]);

  const defaultInputProps = {
    isWide: props.isWide,
    id: id,
    ...props,
    placeholder: props.placeholder,
    onInput: (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (props.onInput) {
        props.onInput(event.target.value, event);
      }
    },
    ref: ref,
    isValid: isValid,
  };

  return (
    <StyledInputContainer isWide={props.isWide} style={props.wrapperStyle}>
      <StyledInputWrapper isWide={props.isWide}>
        {props.label && (
          <StyledControlLabel htmlFor={id}>{props.label}</StyledControlLabel>
        )}

        {props.type === "date" && props.datePickerProps ? (
          <StyledDatePickerWrapper>
            <DatePicker
              inline={false}
              {...props.datePickerProps}
              customInput={
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <StyledInput {...defaultInputProps} type={"text"} />
              }
            />
          </StyledDatePickerWrapper>
        ) : props.isMultiline ? (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <StyledTextarea {...defaultInputProps} />
        ) : (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <StyledInput {...defaultInputProps} />
        )}

        {props.icon ? <StyledInputIcon>{props.icon}</StyledInputIcon> : null}
      </StyledInputWrapper>

      {!props.isValid && (
        <StyledErrorMessageText>{props.errorMessage}</StyledErrorMessageText>
      )}
    </StyledInputContainer>
  );
});

Input.defaultProps = {
  placeholder: "",
};

export const StyledFormInput = styled(Input).attrs((props) => ({
  wrapperStyle: {
    marginBottom: theme.input.inputBottomIndent,
  },

  ...props,
}))``;

export const StyledFormInputLast = styled(Input).attrs((props) => ({
  wrapperStyle: {
    marginBottom: theme.input.inputBottomIndentLast,
  },

  ...props,
}))``;
