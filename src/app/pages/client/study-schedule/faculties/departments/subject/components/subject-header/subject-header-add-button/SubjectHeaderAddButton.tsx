import React from "react";
import { useTranslation } from "react-i18next";
import { RequestError } from "@ui/components/error-view/error-view-variants/RequestError";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { subjectSlice } from "@store/modules/index";
import { selectDetailDepartmentInfo } from "@store/modules/study-schedule/sections/faculties/sections/department/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { EStudyScheduleTypes } from "@domain/entity/study-schedule/index";
import { StyledSubjectHeaderAddButton } from "@app/pages/client/study-schedule/faculties/departments/subject/components/subject-header/subject-header-add-button/styled";

export const SubjectHeaderAddButton: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { type } = useAppSelector(selectStudySchedule);
  const departmentInfo = useAppSelector(selectDetailDepartmentInfo);

  const isSchool = type === EStudyScheduleTypes.SCHOOL;

  if (!departmentInfo && !isSchool) {
    return <RequestError />;
  }

  return (
    <StyledSubjectHeaderAddButton
      mode={"wide"}
      onClick={(): void => {
        dispatch(
          subjectSlice.actions.setCreateSubjectModalShown({
            status: true,
            facultyId: isSchool
              ? undefined
              : (departmentInfo?.department.faculty_id as Id),
            departmentId: isSchool
              ? undefined
              : (departmentInfo?.department.id as Id),
          }),
        );
      }}>
      {t("app.pages.StudySchedule.orgStructure.subject.createButtonText")}
    </StyledSubjectHeaderAddButton>
  );
};
