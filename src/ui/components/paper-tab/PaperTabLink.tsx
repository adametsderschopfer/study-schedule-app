import React from "react";
import { useLinkClickHandler, useMatch } from "react-router-dom";
import { StyledPaperTabLink } from "@ui/components/paper-tab/styled";

export interface PaperTabLinkProps {
  name: string;
  href: string;
  matchUrl: string;
}

export const PaperTabLink: React.FC<PaperTabLinkProps> = (props) => {
  const isActive = useMatch(props.matchUrl);
  const onClickLinkHandler = useLinkClickHandler(props.href);

  return (
    <StyledPaperTabLink
      isActiveElement={!!isActive}
      onClick={onClickLinkHandler}
    >
      {props.name}
    </StyledPaperTabLink>
  );
};
