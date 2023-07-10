import React from "react";
import {
  StyledTypeSelector,
  StyledTypeSelectorItem,
  StyledTypeSelectorItemTooltip,
  StyledTypeSelectorWrapper,
} from "@ui/components/type-selector/styled";
import { TypeSelectorProps } from "@ui/components/type-selector/types";

export const TypeSelector: React.FC<TypeSelectorProps> = (props) => {
  if (!props.items.length) {
    return null;
  }

  return (
    <StyledTypeSelector>
      <StyledTypeSelectorWrapper>
        {props.items.map((item, index) => {
          return (
            <StyledTypeSelectorItem
              key={`TypeSelectorItem_${index}`}
              isActive={
                props.currentValue instanceof Function
                  ? props.currentValue(item)
                  : item.value === props.currentValue
              }
              onClick={(): void => {
                props.onItemSelect(item);
              }}>
              {item.tooltipLabel && (
                <StyledTypeSelectorItemTooltip>
                  {item.tooltipLabel}
                </StyledTypeSelectorItemTooltip>
              )}

              {item.name}
            </StyledTypeSelectorItem>
          );
        })}
      </StyledTypeSelectorWrapper>
    </StyledTypeSelector>
  );
};
