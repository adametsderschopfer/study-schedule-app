import { theme } from "@config/theme";
import styled from "styled-components";
import { StyledHeadTitle } from "@ui/components/title/HeadTitle";

export const StyledSidebarContainer = styled.div`
  display: flex;
  flex-shrink: 0;

  position: sticky;
  top: 98px;
  left: 0;

  width: 100%;
  max-width: 336px;

  height: calc(100vh - 98px);
  background: #ffffff;
  z-index: 8;

  box-shadow: 0 4px 20px rgba(61, 92, 109, 0.1);
`;

export const StyledSidebarContent = styled.div`
  overflow-y: auto;
  height: 100%;
  width: 100%;
`;

export const StyledSidebarTitle = styled(StyledHeadTitle)`
  font-size: 26px;
  line-height: 36px;

  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledSidebarSubTitle = styled(StyledHeadTitle)`
  font-size: 16px;
  font-weight: 400;
  color: ${theme.colors.grayText};
`;
