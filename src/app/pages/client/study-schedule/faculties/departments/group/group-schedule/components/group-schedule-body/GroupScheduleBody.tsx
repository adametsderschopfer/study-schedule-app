import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DatePicker } from "@ui/components/date-picker/DatePicker";
import { drawDatePickerWeek } from "@ui/components/date-picker/drawDatePickerWeek";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { ScheduleTableLoader } from "@ui/skeletons/components/schedule-table/ScheduleTableLoader";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loadSchedulesAction } from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/actions";
import { selectGroupSchedule } from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/selector";
import { groupScheduleSlice } from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/slice";
import { GroupScheduleTableNotify } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-body/group-schedule-table-notify/GroupScheduleTableNotify";
import {
  StyledScheduleTableSidebar,
  StyledScheduleTableWrapper,
} from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-body/styled";
import { GroupScheduleTable } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-table/GroupScheduleTable";

export const GroupScheduleBody: React.FC = () => {
  const params = useParams();

  const schedule = useAppSelector(selectGroupSchedule);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      loadSchedulesAction({
        date_start: schedule.dateStart,
        date_end: schedule.dateEnd,
        group_id: params.scheduleId,
        department_id: params.departmentId,
      }),
    );
  }, [schedule.dateStart]);

  const handleDateChange = (date: Date): void => {
    dispatch(groupScheduleSlice.actions.setWeek(date));
  };

  return (
    <StyledScheduleTableWrapper>
      <ErrorBoundary>
        {schedule.loading === "still-loading" ? (
          <ScheduleTableLoader />
        ) : (
          <GroupScheduleTable />
        )}
      </ErrorBoundary>

      <StyledScheduleTableSidebar>
        <DatePicker
          renderDayContents={drawDatePickerWeek(
            schedule.currentDate,
            schedule.dateStart,
            schedule.dateEnd,
          )}
          selected={schedule.currentDate}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onChange={handleDateChange}
        />

        <GroupScheduleTableNotify />
      </StyledScheduleTableSidebar>
    </StyledScheduleTableWrapper>
  );
};
