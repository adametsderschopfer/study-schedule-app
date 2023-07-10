import React from "react";
import { useTranslation } from "react-i18next";
import { BaseModal } from "@ui/components/modals/BaseModal";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { teachersSlice } from "@store/modules/index";
import { createTeacherAction } from "@store/modules/study-schedule/sections/faculties/sections/teachers/actions";
import { selectStudyScheduleFacultyTeachers } from "@store/modules/study-schedule/sections/faculties/sections/teachers/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { TeachersForm } from "@app/pages/client/study-schedule/faculties/departments/teachers/components/teachers-form/TeachersForm";

export const TeachersModalAdd: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const teachers = useAppSelector(selectStudyScheduleFacultyTeachers);
  const { type: moduleType } = useAppSelector(selectStudySchedule);

  const onRequestClose = (): void => {
    dispatch(teachersSlice.actions.setCreateTeacherFormShown(false));
  };

  return (
    <BaseModal
      headerTitle={t(
        `app.pages.StudySchedule.orgStructure.teachers.addModalTitle.${moduleType}`,
      )}
      isOpen={!!teachers.createModal.isShown}
      onRequestClose={onRequestClose}
      loading={teachers.createModal.loading}
    >
      <TeachersForm
        onSubmit={(data): void => {
          dispatch(
            createTeacherAction({
              ...data,
              department_id: null,
            }),
          );
        }}
        onRequestClose={onRequestClose}
      />
    </BaseModal>
  );
};
