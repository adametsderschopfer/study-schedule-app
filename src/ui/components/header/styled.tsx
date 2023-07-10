import styled from "styled-components";
import { StyledContainerLarge } from "@ui/components/layout/Container";
import { Logo } from "@ui/components/logo/Logo";
import { UserProfileBar } from "@ui/components/user/user-profile/user-profile-bar/UserProfileBar";

export const StyledHeaderContainer = styled.div`
  width: 100%;

  position: sticky;
  top: 0;
  left: 0;

  z-index: 10;

  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(61, 92, 109, 0.1);
`;

export const StyledHeaderWrapper = styled(StyledContainerLarge)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledHeaderMeta = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledHeaderMetaLogo = styled(Logo)`
  margin-right: 20px;
`;

export const StyledHeaderAccount = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledUserProfileBar = styled(UserProfileBar)`
  margin-right: 40px;
`;
