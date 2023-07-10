import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { RequestError } from "@ui/components/error-view/error-view-variants/RequestError";
import { HeaderLoader } from "@ui/skeletons/components/header/HeaderLoader";
import { LineItemListLoader } from "@ui/skeletons/components/line-item/LineItemListLoader";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loadFacultiesAction } from "@store/modules/study-schedule/sections/faculties/actions";
import { selectStudyScheduleFaculty } from "@store/modules/study-schedule/sections/faculties/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { EStudyScheduleTypes } from "@domain/entity/study-schedule/index";
import { FacultiesBody } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-body/FacultiesBody";
import { FacultiesHeader } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-header/FacultiesHeader";
import { FacultiesCreateFormModal } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-modal/faculties-modal-create/FacultiesCreateFormModal";
import { FacultiesCreateDepartmentFormModal } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-modal/faculties-modal-department-create/FacultiesCreateDepartmentFormModal";
import { FacultiesEditDepartmentFormModal } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-modal/faculties-modal-department-edit/FacultiesEditDepartmentFormModal";
import { FacultiesEditFormModal } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-modal/faculties-modal-edit/FacultiesEditFormModal";

export const FacultiesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const faculty = useAppSelector(selectStudyScheduleFaculty);
  const { type: moduleType } = useAppSelector(selectStudySchedule);

  useEffect(() => {
    dispatch(
      loadFacultiesAction({
        page: 1,
      }),
    );
  }, [dispatch]);

  if (faculty.loading === "loading") {
    return (
      <>
        <HeaderLoader />
        <LineItemListLoader />
      </>
    );
  }

  if (faculty.loading === "error") {
    return <RequestError />;
  }

  if (moduleType === EStudyScheduleTypes.SCHOOL) {
    return (
      <Navigate to={`/client/study-schedule/faculties/detail/department`} />
    );
  }

  return (
    <>
      <FacultiesHeader />
      <FacultiesBody />

      <FacultiesCreateFormModal />
      <FacultiesEditFormModal />

      <FacultiesCreateDepartmentFormModal />
      <FacultiesEditDepartmentFormModal />
    </>
  );
};
