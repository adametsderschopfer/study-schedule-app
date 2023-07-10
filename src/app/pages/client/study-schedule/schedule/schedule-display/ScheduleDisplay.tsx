import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { RequestError } from "@ui/components/error-view/error-view-variants/RequestError";
import { ScheduleTable } from "@ui/components/study-schedule/schedule-table/ScheduleTable";
import { ScheduleTableLoader } from "@ui/skeletons/components/schedule-table/ScheduleTableLoader";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loadScheduleContent } from "@store/modules/study-schedule/sections/schedule/actions";
import {
  selectSchedule,
  selectScheduleTable,
} from "@store/modules/study-schedule/sections/schedule/selector";
import { ScheduleDisplayCell } from "@app/pages/client/study-schedule/schedule/schedule-display/schedule-display-cell/ScheduleDisplayCell";
import { ScheduleDisplayHeader } from "@app/pages/client/study-schedule/schedule/schedule-display/schedule-display-header/ScheduleDisplayHeader";
import { StyledScheduleDisplayTable } from "@app/pages/client/study-schedule/schedule/schedule-display/styled";

export const ScheduleDisplay: React.FC = () => {
  const schedule = useAppSelector(selectSchedule);
  const scheduleTable = useAppSelector(selectScheduleTable);
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    dispatch(loadScheduleContent(params));
  }, []);

  return (
    <>
      <ScheduleDisplayHeader />

      <ErrorBoundary>
        {schedule.displayLoading === "loading" ? (
          <ScheduleTableLoader />
        ) : schedule.displayLoading === "error" ? (
          <RequestError />
        ) : (
          <StyledScheduleDisplayTable>
            <ScheduleTable
              table={scheduleTable}
              renderCell={(params): JSX.Element => {
                return <ScheduleDisplayCell {...params} />;
              }}
            />
          </StyledScheduleDisplayTable>
        )}
      </ErrorBoundary>
    </>
  );
};
