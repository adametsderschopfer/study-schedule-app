import React from "react";
import { useTranslation } from "react-i18next";
import { BaseModal } from "@ui/components/modals/BaseModal";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { subjectSlice } from "@store/modules/index";
import { editSubjectAction } from "@store/modules/study-schedule/sections/faculties/sections/subject/actions";
import {
  selectStudyScheduleFacultySubject,
  selectStudyScheduleSubjectEditCurrent,
} from "@store/modules/study-schedule/sections/faculties/sections/subject/selector";
import { ISubjectEntity } from "@domain/entity/study-schedule/index";
import { SubjectForm } from "@app/pages/client/study-schedule/faculties/departments/subject/components/subject-form/SubjectForm";

export const SubjectModalEdit: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const subject = useAppSelector(selectStudyScheduleFacultySubject);
  const currentSubject = useAppSelector(
    selectStudyScheduleSubjectEditCurrent,
  ) as ISubjectEntity;

  const onRequestClose = (): void => {
    dispatch(
      subjectSlice.actions.setEditSubjectModalShown({
        status: false,
        itemId: null,
        facultyId: null,
        departmentId: null,
      }),
    );
  };

  return (
    <BaseModal
      headerTitle={t(
        "app.pages.StudySchedule.orgStructure.subject.editModalTitle",
      )}
      isOpen={!!subject.editModal.isShown}
      onRequestClose={onRequestClose}
      loading={subject.editModal.loading}>
      <SubjectForm
        onSubmit={(data): void => {
          dispatch(
            editSubjectAction({
              id: currentSubject.id,
              name: data.name,
              department_id: currentSubject.department_id,
            }),
          );
        }}
        defaultValues={{
          name: currentSubject?.name,
          isAddInAllDepartments: false,
        }}
        onRequestClose={onRequestClose}
      />
    </BaseModal>
  );
};
