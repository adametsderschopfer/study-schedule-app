import React from "react";
import {
  StyledCountChooserFieldCountList,
  StyledCountChooserFieldCountListItem,
  StyledCountChooserFieldHint,
  StyledCountChooserFieldLabel,
  StyledCountChooserFieldWrapper,
} from "@ui/components/count-chooser-field/styled";

const MAX_COUNT_AVAILABLE = 14;

interface CountChooserFieldProps {
  onCountSelect(count: number): void;

  currentCount: number | null | undefined | string;

  label?: string | null;
  hint?: string | null;
  className?: string;
}

export const CountChooserField: React.FC<CountChooserFieldProps> = (props) => {
  const items = Array.from(Array(MAX_COUNT_AVAILABLE)).map(
    (_, index) => index + 1,
  );
  const currentCount = props.currentCount || 1;

  return (
    <StyledCountChooserFieldWrapper className={props.className}>
      {props.label && (
        <StyledCountChooserFieldLabel>
          {props.label}
        </StyledCountChooserFieldLabel>
      )}

      <StyledCountChooserFieldCountList>
        {items.map((countItem) => (
          <StyledCountChooserFieldCountListItem
            isActive={currentCount >= countItem}
            key={`Count_item_${countItem}`}
            type={"button"}
            onClick={(): void => {
              props.onCountSelect(countItem);
            }}>
            {countItem}
          </StyledCountChooserFieldCountListItem>
        ))}
      </StyledCountChooserFieldCountList>

      {props.hint && (
        <StyledCountChooserFieldHint>{props.hint}</StyledCountChooserFieldHint>
      )}
    </StyledCountChooserFieldWrapper>
  );
};
