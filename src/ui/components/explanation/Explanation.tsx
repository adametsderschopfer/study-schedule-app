import React from "react";
import { StyledExplanationContainer } from "@ui/components/explanation/styled";
import { StepExplanation } from "@ui/components/step-explanation/StepExplanation";

type ExplanationBlockStep = {
  title: string;
  description: string;
};

interface ExplanationBlockProps {
  steps: ExplanationBlockStep[];
  isVertical?: boolean;
}

export const ExplanationBlock: React.FC<ExplanationBlockProps> = (props) => {
  return (
    <StyledExplanationContainer isVertical={props.isVertical}>
      {props.steps.map((step, index) => (
        <StepExplanation
          isVertical={props.isVertical}
          key={`StepExplanation_item_${index}`}
          index={index + 1}
          {...step}
        />
      ))}
    </StyledExplanationContainer>
  );
};
