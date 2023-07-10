import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledExplanationContainer = styled.div<{ isVertical?: boolean }>`
  padding: 20px 0;
  width: 100%;

  display: flex;
  align-items: flex-start;
  flex-direction: ${(props): string => (props.isVertical ? "column" : "row")};

  @media screen and (max-width: ${theme.breakPoints.desktopBig}px) {
    flex-wrap: wrap;
  }
`;
