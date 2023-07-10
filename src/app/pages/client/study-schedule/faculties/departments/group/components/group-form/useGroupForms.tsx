import { useMemo } from "react";
import { useTranslation, UseTranslationResponse } from "react-i18next";
import { useAppSelector } from "@store/hooks";
import { selectFacultyDepartmentInfo } from "@store/modules/study-schedule/sections/faculties/sections/department/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { TSelectData } from "@domain/app";
import {
  getFormOfEducationAsSelectOptions,
  getLevelsOfEducationAsSelectOptions,
  getSubGroupAsSelectOptions,
  getYearOfEducationAsSelectOptions,
} from "@domain/entity/study-schedule/data";
import {
  EStudyScheduleTypes,
  IFacultyEntity,
} from "@domain/entity/study-schedule/index";

type TUseGroupForm = {
  subgroupOptions: TSelectData<number>[];
  yearsOptions: TSelectData<number>[];
  degreeOptions: TSelectData<number | string>[];
  formsOptions: TSelectData<number>[];

  initialFacultyOption: TSelectData<IFacultyEntity> | undefined;

  moduleType: EStudyScheduleTypes;
  translation: UseTranslationResponse<
    "",
    "app.pages.StudySchedule.orgStructure.group.createGroup"
  >;
};

export const useGroupForms = (): TUseGroupForm => {
  const translation = useTranslation("", {
    keyPrefix: "app.pages.StudySchedule.orgStructure.group.createGroup",
  });

  const { detailInfo: facultyDetail } = useAppSelector(
    selectFacultyDepartmentInfo,
  );
  const { type: moduleType } = useAppSelector(selectStudySchedule);

  const subgroupOptions = getSubGroupAsSelectOptions();
  const yearsOptions = getYearOfEducationAsSelectOptions(moduleType);
  const degreeOptions = getLevelsOfEducationAsSelectOptions(moduleType);
  const formsOptions = getFormOfEducationAsSelectOptions();

  const initialFacultyOption = facultyDetail
    ? { label: facultyDetail.name, value: facultyDetail }
    : undefined;

  return useMemo(
    () => ({
      subgroupOptions,
      yearsOptions,
      degreeOptions,
      formsOptions,

      initialFacultyOption,

      moduleType,
      translation,
    }),
    [],
  );
};
