import { theme } from "@config/theme";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledCartEntityWrapper = styled(Link)`
  width: 100%;
  padding: 13px 24px;
  height: 96px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #ffffff;
  box-shadow: 0 4px 20px rgba(61, 92, 109, 0.1);
  border-radius: 2px;

  margin-bottom: 32px;
`;

export const StyledCartEntityName = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
  color: ${theme.colors.grayText};
  word-break: break-word;

  transition: 200ms;

  ${StyledCartEntityWrapper}:hover & {
    color: ${theme.colors.primary};
  }
`;

export const StyledCartEntityArrow = styled.div`
  margin-left: 16px;
  width: 40px;
  height: 40px;
  background-color: ${theme.colors.primary};

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: 200ms;
  border-radius: 50px;

  & svg {
    transform: rotate(-90deg);
  }

  ${StyledCartEntityWrapper}:hover & {
    transform: scale(1.1);
  }
`;
