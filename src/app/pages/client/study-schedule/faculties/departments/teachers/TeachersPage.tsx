import React, { useEffect } from "react";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { RequestError } from "@ui/components/error-view/error-view-variants/RequestError";
import { HeaderLoader } from "@ui/skeletons/components/header/HeaderLoader";
import { TableTightLoader } from "@ui/skeletons/components/table-tight/TableTightLoader";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loadTeachersAction } from "@store/modules/study-schedule/sections/faculties/sections/teachers/actions";
import { selectStudyScheduleFacultyTeachers } from "@store/modules/study-schedule/sections/faculties/sections/teachers/selector";
import { TeachersHeader } from "@app/pages/client/study-schedule/faculties/departments/teachers/components/teachers-header/TeachersHeader";
import { TeachersList } from "@app/pages/client/study-schedule/faculties/departments/teachers/components/teachers-list/TeachersList";
import { TeachersModalAdd } from "@app/pages/client/study-schedule/faculties/departments/teachers/components/teachers-modal/teachers-modal-add/TeachersModalAdd";
import { TeachersModalEdit } from "@app/pages/client/study-schedule/faculties/departments/teachers/components/teachers-modal/teachers-modal-edit/TeachersModalEdit";

export const TeachersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const teachers = useAppSelector(selectStudyScheduleFacultyTeachers);

  useEffect(() => {
    dispatch(
      loadTeachersAction({
        page: 1,
      }),
    );
  }, [dispatch]);

  if (teachers.loading === "error") {
    return <RequestError />;
  }

  if (teachers.loading === "loading") {
    return (
      <>
        <HeaderLoader />
        <TableTightLoader />
      </>
    );
  }

  return (
    <>
      <TeachersHeader />

      <ErrorBoundary>
        <TeachersList />
      </ErrorBoundary>

      <TeachersModalAdd />
      <TeachersModalEdit />
    </>
  );
};
