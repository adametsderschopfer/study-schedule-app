import styled from "styled-components";

export const StyledScheduleTableWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  position: relative;
`;

export const StyledScheduleTableSidebar = styled.div`
  max-width: 341px;
  margin-left: 25px;

  position: sticky;
  top: 125px;
`;

export const StyledScheduleTableNotify = styled.div`
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 25px;
  margin-top: 25px;
`;

export const StyledScheduleTableNotifyText = styled.div`
  margin-bottom: 32px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;
