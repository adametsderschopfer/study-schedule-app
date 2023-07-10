import { useAppSelector } from "@store/hooks";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { TSelectData } from "@domain/app";
import {
  getLevelsOfEducationAsSelectOptions,
  getYearOfEducationAsSelectOptions,
} from "@domain/entity/study-schedule/data";
import {
  ELevelsOfEducation,
  EYearsOfEducation,
  EYearsOfEducationSchool,
} from "@domain/entity/study-schedule/index";

export type TUseFilterFields = {
  degreeOptions: TSelectData<ELevelsOfEducation | string>[];
  yearOfEducationOptions: TSelectData<
    EYearsOfEducationSchool | EYearsOfEducation
  >[];
  letterOptions: TSelectData<string | number>[];
};

export const useFilterFields = (): TUseFilterFields => {
  const { type: moduleType } = useAppSelector(selectStudySchedule);

  const degreeOptions = getLevelsOfEducationAsSelectOptions(moduleType);
  const yearOfEducationOptions = getYearOfEducationAsSelectOptions(moduleType);
  const letterOptions = getLevelsOfEducationAsSelectOptions(moduleType);

  return {
    degreeOptions,
    yearOfEducationOptions,
    letterOptions,
  };
};
