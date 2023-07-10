import React from "react";
import { StyledLoaderIndicator } from "@ui/components/loader-indicator";
import { StyledPageActionLoaderWrapper } from "@ui/components/page/page-action-loader/styled";
import { useAppSelector } from "@store/hooks";
import { selectApp } from "@store/modules/app/selector";

export const PageActionLoader: React.FC = () => {
  const app = useAppSelector(selectApp);

  if (!app.isActionLoading) {
    return <></>;
  }

  return (
    <StyledPageActionLoaderWrapper>
      <StyledLoaderIndicator />
    </StyledPageActionLoaderWrapper>
  );
};
