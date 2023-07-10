import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledPageActionLoaderWrapper = styled.div`
  position: fixed;
  bottom: 25px;
  right: 25px;

  background-color: #ffffff;
  width: 50px;
  height: 50px;
  padding: 10px;

  border-radius: 50px;
  z-index: 500000;

  border: 1px solid ${theme.colors.primary};

  & > div {
    width: 100%;
    height: 100%;
  }
`;
