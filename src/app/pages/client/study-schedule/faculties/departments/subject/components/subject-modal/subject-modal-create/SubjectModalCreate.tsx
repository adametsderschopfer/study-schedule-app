import React from "react";
import { useTranslation } from "react-i18next";
import { BaseModal } from "@ui/components/modals/BaseModal";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { subjectSlice } from "@store/modules/index";
import { selectDetailDepartmentInfo } from "@store/modules/study-schedule/sections/faculties/sections/department/selector";
import { createSubjectAction } from "@store/modules/study-schedule/sections/faculties/sections/subject/actions";
import { selectStudyScheduleFacultySubject } from "@store/modules/study-schedule/sections/faculties/sections/subject/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { EStudyScheduleTypes } from "@domain/entity/study-schedule/index";
import { SubjectForm } from "@app/pages/client/study-schedule/faculties/departments/subject/components/subject-form/SubjectForm";

export const SubjectModalCreate: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { type } = useAppSelector(selectStudySchedule);
  const subject = useAppSelector(selectStudyScheduleFacultySubject);
  const departmentInfo = useAppSelector(selectDetailDepartmentInfo);

  const isSchool = type === EStudyScheduleTypes.SCHOOL;

  const onRequestClose = (): void => {
    dispatch(
      subjectSlice.actions.setCreateSubjectModalShown({
        status: false,
        facultyId: null,
        departmentId: null,
      }),
    );
  };

  return (
    <BaseModal
      headerTitle={t(
        "app.pages.StudySchedule.orgStructure.subject.createModalTitle",
      )}
      isOpen={!!subject.createModal.isShown}
      onRequestClose={onRequestClose}
      loading={subject.createModal.loading}>
      <SubjectForm
        onSubmit={(data): void => {
          dispatch(
            createSubjectAction({
              isAddInAllDepartments: data.isAddInAllDepartments,
              name: data.name,
              department_id: isSchool
                ? undefined
                : departmentInfo?.department.id,
            }),
          );
        }}
        onRequestClose={onRequestClose}
      />
    </BaseModal>
  );
};
