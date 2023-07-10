import React from "react";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { PaperTabLinkProps } from "@ui/components/paper-tab/PaperTabLink";
import { StyledPaperTabLinksWrapper } from "@ui/components/paper-tab/styled";

interface PaperTabLinks {
  children:
    | React.ReactElement<PaperTabLinkProps>
    | React.ReactElement<PaperTabLinkProps>[];
  className?: string;
}

export const PaperTabLinks: React.FC<PaperTabLinks> = (props) => {
  return (
    <StyledPaperTabLinksWrapper className={props.className}>
      <ErrorBoundary>
        {React.Children.map(props.children, (tab) => {
          return tab;
        })}
      </ErrorBoundary>
    </StyledPaperTabLinksWrapper>
  );
};
