import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { ParamsError } from "@ui/components/error-view/error-view-variants/ParamsError";
import { RequestError } from "@ui/components/error-view/error-view-variants/RequestError";
import { HeaderLoader } from "@ui/skeletons/components/header/HeaderLoader";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { updateDetailGroupInfoAction } from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/actions";
import { selectGroupSchedule } from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/selector";
import { groupScheduleSlice } from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/slice";
import { GroupScheduleBody } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-body/GroupScheduleBody";
import { GroupScheduleHeader } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-header/GroupScheduleHeader";
import { GroupScheduleModalAction } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-modal/GroupScheduleModalAction";

export const GroupSchedulePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const schedule = useAppSelector(selectGroupSchedule);
  const params = useParams();

  const onPageStart = async (): Promise<void> => {
    if (!params.scheduleId) {
      return;
    }

    await dispatch(groupScheduleSlice.actions.setWeek(new Date()));
    await dispatch(updateDetailGroupInfoAction(params.scheduleId));
  };

  useEffect(() => {
    onPageStart();
  }, []);

  if (schedule.loading === "error") {
    return <RequestError />;
  }

  if (!params.scheduleId) {
    return <ParamsError />;
  }

  if (schedule.loading === "loading") {
    return <HeaderLoader />;
  }

  return (
    <ErrorBoundary>
      <GroupScheduleHeader />
      <GroupScheduleBody />

      <GroupScheduleModalAction />
      <GroupScheduleModalAction isEditModal={true} />
    </ErrorBoundary>
  );
};
