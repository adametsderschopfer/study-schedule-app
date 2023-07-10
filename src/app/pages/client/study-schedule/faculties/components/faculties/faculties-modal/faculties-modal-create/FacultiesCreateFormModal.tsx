import React from "react";
import { useTranslation } from "react-i18next";
import { BaseModal } from "@ui/components/modals/BaseModal";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { facultySlice } from "@store/modules/index";
import { createFacultyAction } from "@store/modules/study-schedule/sections/faculties/actions";
import { selectStudyScheduleFaculty } from "@store/modules/study-schedule/sections/faculties/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { FacultyForm } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-form/FacultyForm";

export const FacultiesCreateFormModal: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const faculty = useAppSelector(selectStudyScheduleFaculty);
  const { type: moduleType } = useAppSelector(selectStudySchedule);

  const onRequestClose = (): void => {
    dispatch(
      facultySlice.actions.setCreateFacultyModalShown({ status: false }),
    );
  };

  return (
    <BaseModal
      headerTitle={t(
        `app.pages.StudySchedule.orgStructure.faculties.createFaculty.${moduleType}`,
      )}
      isOpen={!!faculty.createFacultyModal.isShown}
      onRequestClose={onRequestClose}
      loading={faculty.createFacultyModal.loading}
    >
      <FacultyForm
        onRequestClose={onRequestClose}
        onSubmit={(data): void => {
          dispatch(createFacultyAction(data));
        }}
      />
    </BaseModal>
  );
};
