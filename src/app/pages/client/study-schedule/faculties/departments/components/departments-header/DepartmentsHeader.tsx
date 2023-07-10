import React from "react";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { StyledHeadTitleBreak } from "@ui/components/title/HeadTitle";
import { useAppSelector } from "@store/hooks";
import { selectFacultyDepartmentInfo } from "@store/modules/study-schedule/sections/faculties/sections/department/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { selectUser } from "@store/modules/user/selector";
import { EStudyScheduleTypes } from "@domain/entity/study-schedule/index";
import { DepartmentsHeaderBreadcrumbs } from "@app/pages/client/study-schedule/faculties/departments/components/departments-header/departments-header-breadcrumbs/DepartmentsHeaderBreadcrumbs";
import { DepartmentsHeaderTabs } from "@app/pages/client/study-schedule/faculties/departments/components/departments-header/departments-header-tabs/DepartmentsHeaderTabs";
import { StyledDepartmentContentBlockHead } from "@app/pages/client/study-schedule/faculties/departments/components/departments-header/styled";

export const DepartmentsHeader: React.FC = () => {
  const { type } = useAppSelector(selectStudySchedule);
  const departmentInfo = useAppSelector(selectFacultyDepartmentInfo);
  const user = useAppSelector(selectUser);

  const { t } = useTranslation();

  const isSchool = type === EStudyScheduleTypes.SCHOOL;
  const isCollege = type === EStudyScheduleTypes.COLLEGE;

  if (departmentInfo.loading === "loading") {
    return null;
  }

  return (
    <StyledDepartmentContentBlockHead>
      <ErrorBoundary>
        <DepartmentsHeaderBreadcrumbs />
      </ErrorBoundary>

      <StyledHeadTitleBreak>
        {isSchool
          ? user.data.name ||
            t("app.pages.StudySchedule.orgStructure.faculties.school")
          : isCollege
          ? departmentInfo.detailInfo?.name
          : departmentInfo.detailInfo?.department.name}
      </StyledHeadTitleBreak>

      <ErrorBoundary>
        <DepartmentsHeaderTabs />
      </ErrorBoundary>
    </StyledDepartmentContentBlockHead>
  );
};
