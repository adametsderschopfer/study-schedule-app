import styled from "styled-components";
import { ContentBlockHead } from "@ui/components/content-block-head/ContentBlockHead";
import { StyledRow } from "@ui/components/layout/Row";

export const StyledContentBlockHeadCol = styled(ContentBlockHead)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const StyledHeaderRow = styled(StyledRow)`
  justify-content: space-between;
  width: 100%;
`;
