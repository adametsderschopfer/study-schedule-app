import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import { LineItemLoader } from "@ui/skeletons/components/line-item/LineItemLoader";

export const StyledSubjectList = styled(InfiniteScroll)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const StyledSubjectLineItemLoader = styled(LineItemLoader)`
  width: 49%;
`;
