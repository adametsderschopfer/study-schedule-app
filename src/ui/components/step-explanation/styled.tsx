import { theme } from "@config/theme";
import styled from "styled-components";
import { StyledText } from "@ui/components/text/Text";

export const StyledStepExplanationWrapper = styled.div<{
  isVertical?: boolean;
}>`
  width: 100%;
  max-width: ${(props): string => (props.isVertical ? "auto" : "290px")};

  display: flex;
  flex-direction: ${(props): string => (props.isVertical ? "row" : "column")};
  align-items: flex-start;
  justify-content: flex-start;

  position: relative;

  margin-bottom: 15px;

  &:not(:last-of-type):before {
    content: "";

    position: absolute;
    top: 20px;
    left: ${(props): string => (props.isVertical ? "18px" : "0")};

    width: ${(props): string => (props.isVertical ? "2px" : "100%")};
    height: ${(props): string => (!props.isVertical ? "2px" : "100%")};
    border: 1px dashed ${theme.colors.primary};
  }
`;

export const StyledStepExplanationNumber = styled.div<{ isVertical?: boolean }>`
  border-radius: 50px;
  background-color: ${theme.colors.primary};
  color: #ffffff;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  margin-bottom: 15px;
  margin-right: ${(props): string => (props.isVertical ? "25px" : "0")};

  box-shadow: 0 4px 20px rgba(61, 92, 109, 0.1);

  z-index: 2;
`;

export const StyledStepExplanationInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledStepExplanationTitle = styled.div`
  margin-bottom: 15px;

  color: ${theme.colors.primary};
  font-size: 20px;
  line-height: 22px;
  font-weight: 500;
`;

export const StyledStepExplanationDescription = styled(StyledText)<{
  isVertical?: boolean;
}>`
  font-size: 16px;
  line-height: 24px;

  width: 100%;
  max-width: ${(props): string => (props.isVertical ? "100%" : "230px")};
`;
