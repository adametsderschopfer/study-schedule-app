import React from "react";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { HeaderMenu } from "@ui/components/header/header-menu/HeaderMenu";
import {
  StyledHeaderAccount,
  StyledHeaderContainer,
  StyledHeaderMeta,
  StyledHeaderMetaLogo,
  StyledHeaderWrapper,
  StyledUserProfileBar,
} from "@ui/components/header/styled";
import { LangSwitcher } from "@ui/components/lang/lang-switcher/LangSwitcher";
import { UserLogoutButton } from "@ui/components/user/user-logout-button/UserLogoutButton";

export const Header: React.FC = () => {
  return (
    <StyledHeaderContainer>
      <StyledHeaderWrapper>
        <StyledHeaderMeta>
          <StyledHeaderMetaLogo />
          <ErrorBoundary>
            <LangSwitcher />
          </ErrorBoundary>
        </StyledHeaderMeta>

        <HeaderMenu />

        <StyledHeaderAccount>
          <ErrorBoundary>
            <StyledUserProfileBar />
          </ErrorBoundary>
          <UserLogoutButton />
        </StyledHeaderAccount>
      </StyledHeaderWrapper>
    </StyledHeaderContainer>
  );
};
