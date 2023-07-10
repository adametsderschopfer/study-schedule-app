import React from "react";
import { useTranslation } from "react-i18next";
import { BaseModal } from "@ui/components/modals/BaseModal";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { facultySlice } from "@store/modules/index";
import { createDepartmentAction } from "@store/modules/study-schedule/sections/faculties/actions";
import { selectStudyScheduleFaculty } from "@store/modules/study-schedule/sections/faculties/selector";
import { DepartmentForm } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-form/faculties-department-form/FacultiesDepartmentForm";

export const FacultiesCreateDepartmentFormModal: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const faculty = useAppSelector(selectStudyScheduleFaculty);

  const onRequestClose = (): void => {
    dispatch(
      facultySlice.actions.setCreateDepartmentModalShown({
        status: false,
        facultyId: null,
      }),
    );
  };

  return (
    <BaseModal
      headerTitle={t(
        `app.pages.StudySchedule.orgStructure.faculties.createDepartment`,
      )}
      isOpen={!!faculty.createDepartmentModal.isShown}
      onRequestClose={onRequestClose}
      loading={faculty.createDepartmentModal.loading}
    >
      <DepartmentForm
        onRequestClose={onRequestClose}
        onSubmit={(data): void => {
          dispatch(
            createDepartmentAction({
              name: data.name,
              faculty_id: faculty.createDepartmentModal.facultyId as Id,
            }),
          );
        }}
      />
    </BaseModal>
  );
};
