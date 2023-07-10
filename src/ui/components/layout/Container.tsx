import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledContainerLarge = styled.div`
  padding: ${theme.indents.container.large.vertical}px
    ${theme.indents.container.large.horizontal}px;
  width: 100%;
`;

export const StyledContainerLargeLeft = styled.div`
  padding: ${theme.indents.container.large.vertical}px 25px
    ${theme.indents.container.large.vertical}px
    ${theme.indents.container.large.horizontal}px;
  width: 100%;
`;

export const StyledContainerMedium = styled.div`
  padding: ${theme.indents.container.medium.vertical}px
    ${theme.indents.container.medium.horizontal}px;
  width: calc(100% - 336px);
  position: relative;
`;
