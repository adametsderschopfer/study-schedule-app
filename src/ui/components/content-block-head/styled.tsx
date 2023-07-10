import styled from "styled-components";
import { StyledContentBlock } from "@ui/components/layout/ContentBlock";
import { StyledRow } from "@ui/components/layout/Row";
import { StyledText } from "@ui/components/text/Text";
import { StyledHeadTitle } from "@ui/components/title/HeadTitle";

export const StyledContentBlockHeadWrapper = styled(StyledContentBlock)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledContentBlockHeadTitle = styled(StyledHeadTitle)``;

export const StyledContentBlockHeadTimerWrapper = styled(StyledRow)`
  justify-content: flex-end;
`;

export const StyledContentBlockHeadTimerDate = styled(StyledText)`
  line-height: 40px;
  margin-right: 15px;
`;

export const StyledContentBlockHeadTimerTime = styled(StyledText)`
  line-height: 40px;
`;
