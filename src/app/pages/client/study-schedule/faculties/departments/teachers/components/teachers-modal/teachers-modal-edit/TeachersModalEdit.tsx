import React from "react";
import { useTranslation } from "react-i18next";
import { BaseModal } from "@ui/components/modals/BaseModal";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { teachersSlice } from "@store/modules/index";
import { editTeacherAction } from "@store/modules/study-schedule/sections/faculties/sections/teachers/actions";
import {
  selectStudyScheduleFacultyTeachers,
  selectStudyScheduleTeachersCurrentTeacher,
} from "@store/modules/study-schedule/sections/faculties/sections/teachers/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { TeachersForm } from "@app/pages/client/study-schedule/faculties/departments/teachers/components/teachers-form/TeachersForm";

export const TeachersModalEdit: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { type: moduleType } = useAppSelector(selectStudySchedule);
  const teachers = useAppSelector(selectStudyScheduleFacultyTeachers);
  const currentTeacher = useAppSelector(
    selectStudyScheduleTeachersCurrentTeacher,
  );

  const onRequestClose = (): void => {
    dispatch(
      teachersSlice.actions.setEditTeacherFormShown({
        status: false,
        itemId: null,
      }),
    );
  };

  return (
    <BaseModal
      headerTitle={t(
        `app.pages.StudySchedule.orgStructure.teachers.editModalTitle.${moduleType}`,
      )}
      isOpen={!!teachers.editModal.isShown}
      onRequestClose={onRequestClose}
      loading={teachers.editModal.loading}>
      <TeachersForm
        onSubmit={(data): void => {
          if (currentTeacher) {
            dispatch(
              editTeacherAction({
                ...currentTeacher,
                ...data,
              }),
            );
          }
        }}
        defaultValues={currentTeacher}
        onRequestClose={onRequestClose}
      />
    </BaseModal>
  );
};
