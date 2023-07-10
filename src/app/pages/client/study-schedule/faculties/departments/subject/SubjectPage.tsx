import React, { useEffect } from "react";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { RequestError } from "@ui/components/error-view/error-view-variants/RequestError";
import { HeaderLoader } from "@ui/skeletons/components/header/HeaderLoader";
import { LineItemListLoader } from "@ui/skeletons/components/line-item/LineItemListLoader";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loadSubjectAction } from "@store/modules/study-schedule/sections/faculties/sections/subject/actions";
import { selectStudyScheduleFacultySubject } from "@store/modules/study-schedule/sections/faculties/sections/subject/selector";
import { SubjectHeader } from "@app/pages/client/study-schedule/faculties/departments/subject/components/subject-header/SubjectHeader";
import { SubjectList } from "@app/pages/client/study-schedule/faculties/departments/subject/components/subject-list/SubjectList";
import { SubjectModalCreate } from "@app/pages/client/study-schedule/faculties/departments/subject/components/subject-modal/subject-modal-create/SubjectModalCreate";
import { SubjectModalEdit } from "@app/pages/client/study-schedule/faculties/departments/subject/components/subject-modal/subject-modal-edit/SubjectModalEdit";

export const SubjectPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const subject = useAppSelector(selectStudyScheduleFacultySubject);

  useEffect(() => {
    dispatch(
      loadSubjectAction({
        page: 1,
      }),
    );
  }, [dispatch]);

  if (subject.loading === "error") {
    return <RequestError />;
  }

  if (subject.loading === "loading") {
    return (
      <>
        <HeaderLoader />
        <LineItemListLoader />
      </>
    );
  }

  return (
    <>
      <SubjectHeader />

      <ErrorBoundary>
        <SubjectList />
      </ErrorBoundary>

      <SubjectModalCreate />
      <SubjectModalEdit />
    </>
  );
};
