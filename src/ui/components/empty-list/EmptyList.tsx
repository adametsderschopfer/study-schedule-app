import React from "react";
import {
  StyledEmptyListDescription,
  StyledEmptyListTitle,
  StyledEmptyListWrapper,
} from "@ui/components/empty-list/styled";

interface EmptyListProps {
  title?: string | null;
  description?: string | null;
}

export const EmptyList: React.FC<EmptyListProps> = (props) => {
  return (
    <StyledEmptyListWrapper>
      <StyledEmptyListTitle>{props.title}</StyledEmptyListTitle>

      <StyledEmptyListDescription>
        {props.description}
      </StyledEmptyListDescription>
    </StyledEmptyListWrapper>
  );
};
