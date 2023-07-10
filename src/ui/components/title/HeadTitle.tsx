import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledHeadTitle = styled.h1<{ isIndentRight?: boolean }>`
  color: ${theme.colors.primary};
  font-size: 28px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  line-height: 34px;

  margin: 0 ${(props): string => (props.isIndentRight ? "55px" : "0px")} 0 0;
`;

export const StyledHeadTitleBreak = styled(StyledHeadTitle)`
  word-break: break-word;
`;
