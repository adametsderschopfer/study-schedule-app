import React from "react";
import { useTranslation } from "react-i18next";
import { BaseModal } from "@ui/components/modals/BaseModal";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { facultySlice } from "@store/modules/index";
import { editFaculty } from "@store/modules/study-schedule/sections/faculties/actions";
import {
  selectStudyScheduleFaculty,
  selectStudyScheduleFacultyEditCurrentItem,
} from "@store/modules/study-schedule/sections/faculties/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { FacultyForm } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-form/FacultyForm";

export const FacultiesEditFormModal: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const faculty = useAppSelector(selectStudyScheduleFaculty);
  const currentFaculty = useAppSelector(
    selectStudyScheduleFacultyEditCurrentItem,
  );
  const { type: moduleType } = useAppSelector(selectStudySchedule);

  const onRequestClose = (): void => {
    dispatch(facultySlice.actions.setEditFacultyModalShown({ status: false }));
  };

  return (
    <BaseModal
      headerTitle={t(
        `app.pages.StudySchedule.orgStructure.faculties.editFaculty.${moduleType}`,
      )}
      isOpen={!!faculty.editFacultyModal.isShown}
      onRequestClose={onRequestClose}
      loading={faculty.editFacultyModal.loading}
    >
      <FacultyForm
        onRequestClose={onRequestClose}
        defaultValues={currentFaculty}
        onSubmit={(data): void => {
          if (currentFaculty) {
            dispatch(editFaculty({ ...data, id: currentFaculty.id }));
          }
        }}
      />
    </BaseModal>
  );
};
