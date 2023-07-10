import React from "react";
import {
  StyledCartEntityArrow,
  StyledCartEntityName,
  StyledCartEntityWrapper,
} from "@ui/components/card/card-entity/styled";
import { BottomArrowIcon } from "@ui/components/icons/BottomArrowIcon";

interface CardEntityProps {
  name: string;
  href?: string;
}

export const CardEntity: React.FC<CardEntityProps> = (props) => {
  return (
    <StyledCartEntityWrapper to={props.href || ""}>
      <StyledCartEntityName>{props.name}</StyledCartEntityName>
      <StyledCartEntityArrow>
        <BottomArrowIcon />
      </StyledCartEntityArrow>
    </StyledCartEntityWrapper>
  );
};
