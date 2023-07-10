import { theme } from "@config/theme";
import styled from "styled-components";
import { CircleButton } from "@ui/components/button/circle-button/CircleButton";

export const StyledScheduleCellNewCircle = styled(CircleButton)`
  background-color: ${theme.colors.grayMenuItemBg};
  color: #ffffff;
  border: none;
  pointer-events: none;

  &:hover {
    background-color: ${theme.colors.grayMenuItemBg};
  }
`;

export const StyledScheduleCellNew = styled.div`
  height: 92px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  border: none;

  transition: 200ms;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);

    & ${StyledScheduleCellNewCircle} {
      transform: scale(1.1);
    }
  }
`;

export const StyledScheduleCellItemWrapper = styled.div`
  position: relative;
`;

export const StyledScheduleCellItem = styled.div<{ isCenter: boolean }>`
  height: 92px;

  display: flex;
  flex-direction: column;

  justify-content: ${(props): string =>
    props.isCenter ? "center" : "flex-start"};

  padding: 12px 15px;

  cursor: pointer;
  transition: 200ms;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

export const StyledScheduleCellItemSubgroup = styled.div`
  margin-bottom: 4px;
  font-weight: 400;
  font-size: 10px;
  line-height: 16px;
  color: ${theme.colors.grayTextLight};
`;

export const StyledScheduleCellItemName = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${theme.colors.grayText};

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
