import i18n from "i18next";
import React from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { teachersSlice } from "@store/modules/index";
import { selectStudyScheduleFacultyTeachers } from "@store/modules/study-schedule/sections/faculties/sections/teachers/selector";
import { TSelectData, TSortField } from "@domain/app";
import { StyledSelect } from "@app/pages/client/study-schedule/faculties/departments/teachers/components/teachers-header/teachers-header-sort/styled";

export const SORT_OPTIONS = [
  {
    value: {
      fieldName: "full_name",
      order: "asc",
    },
    label: i18n.t(
      "app.pages.StudySchedule.orgStructure.teachers.sortByFullName",
    ),
  },
  {
    value: {
      fieldName: "full_name",
      order: "desc",
    },
    label: i18n.t(
      "app.pages.StudySchedule.orgStructure.teachers.sortByFullNameRevert",
    ),
  },
  {
    value: {
      fieldName: "position",
      order: "asc",
    },
    label: i18n.t("app.pages.StudySchedule.orgStructure.teachers.sortByDegree"),
  },
  {
    value: {
      fieldName: "position",
      order: "desc",
    },
    label: i18n.t(
      "app.pages.StudySchedule.orgStructure.teachers.sortByDegreeRevert",
    ),
  },
  {
    value: {
      fieldName: "degree",
      order: "asc",
    },
    label: i18n.t(
      "app.pages.StudySchedule.orgStructure.teachers.sortByPosition",
    ),
  },
  {
    value: {
      fieldName: "degree",
      order: "desc",
    },
    label: i18n.t(
      "app.pages.StudySchedule.orgStructure.teachers.sortByPositionRevert",
    ),
  },
];

export const TeachersHeaderSort: React.FC = () => {
  const teacher = useAppSelector(selectStudyScheduleFacultyTeachers);
  const dispatch = useAppDispatch();

  return (
    <StyledSelect
      onChange={(event): void => {
        dispatch(teachersSlice.actions.changeSortType(event.value));
      }}
      isOnlyText={true}
      placeholder={i18n.t(
        "app.pages.StudySchedule.orgStructure.teachers.sortByFullName",
      )}
      options={SORT_OPTIONS}
      valueResolver={(option: TSelectData<TSortField>): boolean =>
        option.value.fieldName === teacher.currentSortType?.fieldName &&
        option.value.order === teacher.currentSortType?.order
      }
    />
  );
};
