import { theme } from "@config/theme";
import styled, { StyledComponentPropsWithRef } from "styled-components";

export const StyledScheduleTableWrapper = styled.div<
  StyledComponentPropsWithRef<any>
>`
  overflow: auto;
  width: 100%;
  height: 100%;

  &:active {
    cursor: grabbing;
  }
`;

export const StyledScheduleTable = styled.table`
  width: 100%;
  height: auto;
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(61, 92, 109, 0.1);

  padding: 15px;

  border-collapse: collapse;
  border-spacing: 0;
`;

export const StyledScheduleTableHeadTd = styled.td`
  height: 48px;
  position: relative;
  padding: 5px 15px;
  min-width: 250px;

  &:not(:last-of-type) {
    &:after {
      content: "";
      position: absolute;
      right: -0.5px;
      top: 50%;
      transform: translateY(-50%);

      height: 28px;
      width: 1px;
      background-color: ${theme.colors.grayLine};
    }
  }
`;

export const StyledScheduleTableHead = styled.tr`
  position: sticky;
  top: 0;
  background: #ffffff;
  z-index: 7;

  & ${StyledScheduleTableHeadTd} {
    background: #ffffff;
    z-index: 7;
  }
`;

export const StyledScheduleTableHeadTdEven = styled(StyledScheduleTableHeadTd)`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  background-color: #ffffff;

  min-width: 100px;
  width: 100px;

  position: sticky;
  left: 0;
  z-index: 2;
`;

export const StyledScheduleTableHeadTdWeekDay = styled(
  StyledScheduleTableHeadTd,
)`
  background-color: transparent;
`;

export const StyledScheduleTableHeadTdWeekDayWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledScheduleTableHeadThWeekDayName = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  text-transform: capitalize;
  color: ${theme.colors.grayText};
`;

export const StyledScheduleTableHeadThWeekDayNumber = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  color: ${theme.colors.primary};
`;

export const StyledScheduleTableBody = styled.tbody``;

export const StyledScheduleTableBodyTr = styled.tr`
  border-top: 1px solid ${theme.colors.grayLine};
  border-bottom: 1px solid ${theme.colors.grayLine};

  min-height: 75px;
`;

export const StyledScheduleTableBodyTd = styled.td<{ isActive: boolean }>`
  min-width: 172px;
  max-width: 172px;
  padding: 0;

  background-color: ${(props): string =>
    props.isActive ? theme.colors.grayMenuItemBg : "transparent"};

  &:not(:last-of-type) {
    border-right: 1px solid ${theme.colors.grayLine};
  }
`;

export const StyledScheduleTableBodyTdEven = styled.td`
  min-height: 75px;
  padding: 0 13px;

  background-color: #ffffff;
  position: sticky;
  left: 0;
  z-index: 3;

  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;

    height: 100%;
    width: 1px;
    background-color: ${theme.colors.grayLine};
  }
`;

export const StyledScheduleTableBodyTdEvenWrapper = styled.div`
  min-height: 75px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledScheduleTableBodyTdTime = styled.div`
  color: ${theme.colors.primary};
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 4px;
`;

export const StyledScheduleTableBodyTdLesson = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: ${theme.colors.grayText};
`;
