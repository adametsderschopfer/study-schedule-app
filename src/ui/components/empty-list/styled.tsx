import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledEmptyListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 25px;
  height: 100%;
  width: 100%;
`;

export const StyledEmptyListTitle = styled.div`
  font-size: 40px;
  line-height: 36px;
  text-align: center;

  margin-bottom: 24px;

  color: ${theme.colors.grayTextLight};
`;

export const StyledEmptyListDescription = styled.div`
  color: ${theme.colors.grayTextLight};
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  max-width: 500px;
`;
