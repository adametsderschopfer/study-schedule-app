import React from "react";
import {
  StyledStepExplanationDescription,
  StyledStepExplanationInfoWrapper,
  StyledStepExplanationNumber,
  StyledStepExplanationTitle,
  StyledStepExplanationWrapper,
} from "@ui/components/step-explanation/styled";

interface StepExplanationProps {
  index: number;
  title: string;
  description: string;
  isVertical?: boolean;
}

export const StepExplanation: React.FC<StepExplanationProps> = (props) => {
  return (
    <StyledStepExplanationWrapper isVertical={props.isVertical}>
      <StyledStepExplanationNumber isVertical={props.isVertical}>
        {props.index}
      </StyledStepExplanationNumber>

      <StyledStepExplanationInfoWrapper>
        <StyledStepExplanationTitle>{props.title}</StyledStepExplanationTitle>
        <StyledStepExplanationDescription isVertical={props.isVertical}>
          {props.description}
        </StyledStepExplanationDescription>
      </StyledStepExplanationInfoWrapper>
    </StyledStepExplanationWrapper>
  );
};
