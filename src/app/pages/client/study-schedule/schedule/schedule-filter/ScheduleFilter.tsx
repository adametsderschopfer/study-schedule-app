import React, { useEffect } from "react";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { useAppDispatch } from "@store/hooks";
import {
  createYMDDAteString,
  scheduleSlice,
} from "@store/modules/study-schedule/sections/schedule/slice";
import { ScheduleFilterBody } from "@app/pages/client/study-schedule/schedule/schedule-filter/components/schedule-filter-body/ScheduleFilterBody";
import { ScheduleFilterHeader } from "@app/pages/client/study-schedule/schedule/schedule-filter/components/schedule-filter-header/ScheduleFilterHeader";

export const ScheduleFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      scheduleSlice.actions.setFilter({
        name: "date_start",
        value: createYMDDAteString(),
      }),
    );
  }, []);

  return (
    <ErrorBoundary>
      <ScheduleFilterHeader />
      <ScheduleFilterBody />
    </ErrorBoundary>
  );
};
