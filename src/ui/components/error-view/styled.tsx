import { theme } from "@config/theme";
import styled from "styled-components";
import { Button } from "@ui/components/button/Button";

export const StyledErrorViewWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding: 25px;
  margin: 5px;

  border-radius: 2px;
  border: 2px dashed ${theme.colors.error};
  background-color: #f9f9f9;
`;

export const StyledErrorViewTitle = styled.div`
  color: ${theme.colors.error};
  font-weight: 500;
  font-size: 22px;
  line-height: 29px;
`;

export const StyledErrorViewType = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;

  color: #adadad;
`;

export const StyledRetryButton = styled(Button)`
  color: ${theme.colors.error};
  border-color: ${theme.colors.error};

  &:hover {
    border-color: ${theme.colors.error};
    background-color: ${theme.colors.error};
  }

  margin-top: 25px;
`;

export const StyledErrorViewDescription = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  margin-top: 10px;
  color: #000000;
`;

export const StyledErrorViewIcon = styled.div`
  margin-bottom: 10px;
`;

export const StyledErrorViewHead = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
