import React from "react";
import {
  StyledCardList,
  StyledCardListWrapper,
} from "@ui/components/card/card-list/styled";
import { CardLoader } from "@ui/skeletons/components/card/CardLoader";

export const CardListLoader: React.FC = () => (
  <StyledCardListWrapper>
    <StyledCardList
      loadMore={(): void => {
        /*nothing*/
      }}
      hasMore={false}>
      <CardLoader />
      <CardLoader />
      <CardLoader />
      <CardLoader />
      <CardLoader />
      <CardLoader />
    </StyledCardList>
  </StyledCardListWrapper>
);
