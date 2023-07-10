import React from "react";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { ParamsError } from "@ui/components/error-view/error-view-variants/ParamsError";
import { ScheduleTable } from "@ui/components/study-schedule/schedule-table/ScheduleTable";
import { useAppSelector } from "@store/hooks";
import {
  selectGroupSchedule,
  selectGroupScheduleTable,
} from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/selector";
import { GroupScheduleTableCell } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-table/group-schedule-table-cell/GroupScheduleTableCell";
import { StyledGroupScheduleTable } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-table/styled";

export const GroupScheduleTable: React.FC = () => {
  const groupSchedule = useAppSelector(selectGroupSchedule);
  const scheduleTable = useAppSelector(selectGroupScheduleTable);

  if (!groupSchedule.dateStart || !groupSchedule.dateEnd) {
    return <ParamsError />;
  }

  return (
    <StyledGroupScheduleTable>
      <ErrorBoundary>
        <ScheduleTable
          table={scheduleTable}
          renderCell={(params): JSX.Element => (
            <GroupScheduleTableCell {...params} />
          )}
        />
      </ErrorBoundary>
    </StyledGroupScheduleTable>
  );
};
