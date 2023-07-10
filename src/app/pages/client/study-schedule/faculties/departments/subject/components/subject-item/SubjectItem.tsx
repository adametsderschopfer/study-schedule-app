import React from "react";
import { useTranslation } from "react-i18next";
import { DropdownMenu } from "@ui/components/dropdown-menu/DropdownMenu";
import { ItemError } from "@ui/components/error-view/error-view-variants/ItemError";
import { RemoveButton } from "@ui/components/remove-button/RemoveButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { subjectSlice } from "@store/modules/index";
import { selectDetailDepartmentInfo } from "@store/modules/study-schedule/sections/faculties/sections/department/selector";
import { deleteSubjectAction } from "@store/modules/study-schedule/sections/faculties/sections/subject/actions";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import {
  EStudyScheduleTypes,
  ISubjectEntity,
} from "@domain/entity/study-schedule/index";
import {
  StyledSubjectItemDropdownButton,
  StyledSubjectItemName,
  StyledSubjectItemWrapper,
} from "@app/pages/client/study-schedule/faculties/departments/subject/components/subject-item/styled";

interface SubjectItemProps {
  item: ISubjectEntity;
}

export const SubjectItem: React.FC<SubjectItemProps> = (props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const departmentInfo = useAppSelector(selectDetailDepartmentInfo);
  const { type } = useAppSelector(selectStudySchedule);

  const isSchool = type === EStudyScheduleTypes.SCHOOL;

  if (!departmentInfo && !isSchool) {
    return <ItemError />;
  }

  return (
    <StyledSubjectItemWrapper>
      <StyledSubjectItemName>{props.item.name}</StyledSubjectItemName>
      <StyledSubjectItemDropdownButton>
        <DropdownMenu
          items={[
            {
              name: t("app.dropdownMenu.remove"),
              component: RemoveButton,
              props: {
                headerTitle: t(
                  `app.pages.StudySchedule.orgStructure.subject.deleteModalTitle`,
                ),
                onRemoveComplete(): void {
                  dispatch(deleteSubjectAction(props.item));
                },
              },
            },
            {
              name: t("app.dropdownMenu.edit"),
              props: {
                onClick(): void {
                  dispatch(
                    subjectSlice.actions.setEditSubjectModalShown({
                      status: true,
                      itemId: props.item.id as Id,
                      departmentId: isSchool
                        ? undefined
                        : (departmentInfo?.department.id as Id),
                      facultyId: isSchool
                        ? undefined
                        : departmentInfo?.department.faculty_id,
                    }),
                  );
                },
              },
            },
          ]}
        />
      </StyledSubjectItemDropdownButton>
    </StyledSubjectItemWrapper>
  );
};
