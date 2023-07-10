import { theme } from "@config/theme";
import styled from "styled-components";
import { StyledContentBlock } from "@ui/components/layout/ContentBlock";

export const StyledSettingsWrapperGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > div:not(:last-child) {
    margin-right: 30px;
  }

  @media screen and (max-width: ${theme.breakPoints
      .desktopBig}px) and (min-width: ${theme.breakPoints.desktop}px) {
    flex-wrap: wrap-reverse;

    & > div:nth-child(2) {
      width: 49%;
    }

    & > div:nth-child(3) {
      width: 49% !important;
    }

    & > div:not(:last-child) {
      margin-right: 0;
    }
  }

  @media screen and (max-width: ${theme.breakPoints.desktop}px) {
    flex-wrap: wrap-reverse;

    & > div:not(:last-child) {
      margin-right: 0;
    }
  }
`;

const StyledContentBase = styled(StyledContentBlock)`
  height: 550px;
  overflow: auto;
`;

export const StyledContentExplanationWrapper = styled(StyledContentBase)``;

export const StyledModesLessonsWrapper = styled(StyledContentBase)`
  padding: 0;
`;

export const StyledModesWrapper = styled(StyledContentBase)`
  padding: 0;
  width: 100%;
  margin-bottom: 32px;
  background-color: transparent;
`;
