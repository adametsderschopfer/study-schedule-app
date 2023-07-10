import React, { useEffect } from "react";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { RequestError } from "@ui/components/error-view/error-view-variants/RequestError";
import { CardListLoader } from "@ui/skeletons/components/card/CardListLoader";
import { HeaderLoader } from "@ui/skeletons/components/header/HeaderLoader";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loadGroupAction } from "@store/modules/study-schedule/sections/faculties/sections/group/actions";
import { selectStudyScheduleDepartmentGroup } from "@store/modules/study-schedule/sections/faculties/sections/group/selector";
import { GroupHeader } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-header/GroupHeader";
import { GroupList } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-list/GroupList";
import { GroupModalAction } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-modal/GroupModalAction";

export const GroupPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const group = useAppSelector(selectStudyScheduleDepartmentGroup);

  useEffect(() => {
    dispatch(
      loadGroupAction({
        page: 1,
      }),
    );
  }, [dispatch]);

  if (group.loading === "loading") {
    return (
      <>
        <HeaderLoader />
        <CardListLoader />
      </>
    );
  }

  if (group.loading === "error") {
    return <RequestError />;
  }

  return (
    <>
      <GroupHeader />

      <ErrorBoundary>
        <GroupList />
      </ErrorBoundary>

      <GroupModalAction />
      <GroupModalAction isEditModal={true} />
    </>
  );
};
