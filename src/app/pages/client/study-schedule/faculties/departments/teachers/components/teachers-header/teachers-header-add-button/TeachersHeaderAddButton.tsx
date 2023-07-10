import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { teachersSlice } from "@store/modules/index";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { StyledTeachersHeaderAddButton } from "@app/pages/client/study-schedule/faculties/departments/teachers/components/teachers-header/teachers-header-add-button/styled";

export const TeachersHeaderAddButton: React.FC = () => {
  const { t } = useTranslation();
  const { type } = useAppSelector(selectStudySchedule);
  const dispatch = useAppDispatch();

  return (
    <StyledTeachersHeaderAddButton
      onClick={(): void => {
        dispatch(teachersSlice.actions.setCreateTeacherFormShown(true));
      }}
    >
      {t(`app.pages.StudySchedule.orgStructure.teachers.addButtonText.${type}`)}
    </StyledTeachersHeaderAddButton>
  );
};
