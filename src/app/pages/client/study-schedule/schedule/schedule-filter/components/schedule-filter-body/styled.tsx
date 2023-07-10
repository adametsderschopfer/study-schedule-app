import { theme } from "@config/theme";
import styled from "styled-components";
import { Button } from "@ui/components/button/Button";
import { StyledTabPanel, StyledTabs } from "@ui/components/tabs/styled";

export const StyledScheduleFilterBodyTabs = styled(StyledTabs)`
  width: 100%;

  & ${StyledTabPanel} {
    margin: 0;
  }
`;

export const StyledScheduleFilterForm = styled.div`
  display: flex;
  margin-top: 48px;
`;

export const StyledScheduleFilterFormBody = styled.div`
  width: 100%;
`;

export const StyledScheduleFilterDatePicker = styled.div`
  margin-right: 27px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 341px;
`;

export const StyledScheduleFilterDatePickerDescription = styled.div`
  margin: 16px 0 0 0;

  font-size: 15px;
  line-height: 24px;
  text-align: center;
  color: ${theme.colors.grayText};
`;

export const StyledScheduleFilterSelectFixedDate = styled.div``;

export const StyledScheduleFilterButton = styled(Button)`
  margin-top: auto;
`;
