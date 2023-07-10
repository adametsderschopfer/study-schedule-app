import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router-dom";
import { RequestError } from "@ui/components/error-view/error-view-variants/RequestError";
import { PageLoader } from "@ui/components/page-loader/PageLoader";
import { BigHeaderLoader } from "@ui/skeletons/components/header/BigHeaderLoader";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getFacultiesDepartmentInfo } from "@store/modules/study-schedule/sections/faculties/sections/department/actions";
import { selectFacultyDepartmentInfo } from "@store/modules/study-schedule/sections/faculties/sections/department/selector";
import { DepartmentsHeader } from "@app/pages/client/study-schedule/faculties/departments/components/departments-header/DepartmentsHeader";

interface DepartmentsLayoutProps {
  isOutletOnly?: boolean;
}

export const DepartmentsLayout: React.FC<DepartmentsLayoutProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { departmentId, facultyId } = useParams();

  const facultyDepartmentInfo = useAppSelector(selectFacultyDepartmentInfo);

  useEffect(() => {
    if (departmentId && facultyId) {
      dispatch(
        getFacultiesDepartmentInfo({
          departmentId,
          facultyId,
        }),
      );
    }
  }, [dispatch, departmentId, facultyId]);

  if (facultyDepartmentInfo.loading === "error") {
    return <RequestError />;
  }

  if (facultyDepartmentInfo.loading === "loading") {
    if (props.isOutletOnly) {
      return <PageLoader text={t("app.loading.studyScheduleLoading")} />;
    }

    return <BigHeaderLoader />;
  }

  if (props.isOutletOnly) {
    return <Outlet />;
  }

  return (
    <>
      <DepartmentsHeader />
      <Outlet />
    </>
  );
};
