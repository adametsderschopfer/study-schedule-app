import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledPageLoader = styled.div`
  height: 100%;
  width: 100%;

  padding: 25px 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const StyledPageLoaderText = styled.div`
  color: ${theme.colors.grayText};
  font-size: 14px;
  line-height: 18px;

  margin-top: 15px;
`;
