import React from "react";
import { useTranslation } from "react-i18next";
import { BaseModal } from "@ui/components/modals/BaseModal";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { facultySlice } from "@store/modules/index";
import { editDepartmentAction } from "@store/modules/study-schedule/sections/faculties/actions";
import {
  selectStudyScheduleFaculty,
  selectStudyScheduleFacultyEditCurrentDepartment,
} from "@store/modules/study-schedule/sections/faculties/selector";
import { DepartmentForm } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-form/faculties-department-form/FacultiesDepartmentForm";

export const FacultiesEditDepartmentFormModal: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const faculty = useAppSelector(selectStudyScheduleFaculty);
  const currentDepartment = useAppSelector(
    selectStudyScheduleFacultyEditCurrentDepartment,
  );

  const onRequestClose = (): void => {
    dispatch(
      facultySlice.actions.setEditDepartmentModalShown({
        status: false,
        facultyId: null,
      }),
    );
  };

  return (
    <BaseModal
      headerTitle={t(
        `app.pages.StudySchedule.orgStructure.faculties.editDepartment`,
      )}
      isOpen={!!faculty.editDepartmentModal.isShown}
      onRequestClose={onRequestClose}
      loading={faculty.editDepartmentModal.loading}
    >
      <DepartmentForm
        onRequestClose={onRequestClose}
        defaultValues={currentDepartment}
        onSubmit={(data): void => {
          if (currentDepartment) {
            dispatch(
              editDepartmentAction({
                name: data.name,
                id: currentDepartment.id,
                faculty_id: currentDepartment.faculty_id,
              }),
            );
          }
        }}
      />
    </BaseModal>
  );
};
