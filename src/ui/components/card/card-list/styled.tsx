import { theme } from "@config/theme";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";

export const StyledCardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  margin: -16px;
`;

export const StyledCardList = styled(InfiniteScroll)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  & > div {
    margin: 16px;
    width: calc((100% / 4) - 32px);
  }

  @media screen and (max-width: ${theme.breakPoints.desktopBig}px) {
    & > div {
      width: calc((100% / 3) - 32px);
    }
  }

  @media screen and (max-width: ${theme.breakPoints.desktop}px) {
    & > div {
      width: calc((100% / 2) - 32px);
    }
  }
`;
