import React, { ComponentPropsWithRef, useState } from "react";
import {
  StyledCheckboxIcon,
  StyledCheckboxInput,
  StyledCheckboxText,
  StyledCheckboxWrapper,
} from "@ui/components/checkbox/styled";

interface CheckboxProps extends ComponentPropsWithRef<"input"> {
  text: string | null;
  isChecked?: boolean;
  onCheck?(isChecked: boolean): void;
}

export const Checkbox: React.FC<CheckboxProps> = React.forwardRef(
  (props, ref) => {
    const [isChecked, setChecked] = useState<boolean>(!!props.isChecked);

    return (
      <label>
        <StyledCheckboxInput
          onChange={(): void => {
            setChecked(!isChecked);

            if (props.onCheck) {
              props.onCheck(!isChecked);
            }
          }}
          type={"checkbox"}
          checked={isChecked}
          ref={ref}
        />

        <StyledCheckboxWrapper>
          <StyledCheckboxIcon isChecked={isChecked} />
          <StyledCheckboxText>{props.text}</StyledCheckboxText>
        </StyledCheckboxWrapper>
      </label>
    );
  },
);
