import { getEnumValues } from "@utils/helper";
import React from "react";
import { useTranslation } from "react-i18next";
import { Select } from "@ui/components/select/Select";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { groupSlice } from "@store/modules/index";
import { selectStudyScheduleGroupNamedFilters } from "@store/modules/study-schedule/sections/faculties/sections/group/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import {
  EFormsOfEducation,
  ELevelsOfEducation,
  ELevelsOfEducationSchool,
  EStudyScheduleTypes,
  EYearsOfEducation,
  EYearsOfEducationSchool,
  TGroupFilter,
} from "@domain/entity/study-schedule/index";
import {
  StyledFilterItem,
  StyledFilterRow,
} from "@app/pages/client/study-schedule/faculties/departments/group/components/group-header/group-header-filter/styled";

export const GroupHeaderFilter: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const groupFilters = useAppSelector(selectStudyScheduleGroupNamedFilters);
  const { type } = useAppSelector(selectStudySchedule);

  const handleFilterSelect = (value: TGroupFilter): void => {
    dispatch(groupSlice.actions.setFilter(value));
  };

  if (type === EStudyScheduleTypes.UNIVERSITY) {
    return (
      <StyledFilterRow>
        <StyledFilterItem>
          <Select
            isOnlyText={true}
            onChange={handleFilterSelect}
            valueResolver={(option: TGroupFilter): boolean =>
              option.value.substring === groupFilters.degree?.value.substring
            }
            placeholder={t("app.store.study-schedule.LevelsOfEducationTitle")}
            options={[
              {
                label: t("app.store.study-schedule.LevelsOfEducationTitle"),
                value: {
                  fieldName: "degree",
                  substring: null,
                },
              },
              ...getEnumValues(ELevelsOfEducation).map((_, index) => ({
                value: {
                  fieldName: "degree",
                  substring: index + 1,
                },
                label: t(
                  `app.store.study-schedule.LevelsOfEducation.${index + 1}`,
                ),
              })),
            ]}
          />
        </StyledFilterItem>
        <StyledFilterItem>
          <Select
            isOnlyText={true}
            onChange={handleFilterSelect}
            valueResolver={(option: TGroupFilter): boolean =>
              option.value.substring ===
              groupFilters.year_of_education?.value.substring
            }
            placeholder={t("app.store.study-schedule.YearsOfEducationTitle")}
            options={[
              {
                label: t("app.store.study-schedule.YearsOfEducationTitle"),
                value: {
                  fieldName: "year_of_education",
                  substring: null,
                },
              },
              ...getEnumValues(EYearsOfEducation).map((_, index) => ({
                value: {
                  fieldName: "year_of_education",
                  substring: index + 1,
                },
                label: `${index + 1} ${t(
                  `app.store.study-schedule.YearsOfEducation`,
                )}`,
              })),
            ]}
          />
        </StyledFilterItem>
        <StyledFilterItem>
          <Select
            isOnlyText={true}
            onChange={handleFilterSelect}
            valueResolver={(option: TGroupFilter): boolean =>
              option.value.substring ===
              groupFilters.form_of_education?.value.substring
            }
            placeholder={t("app.store.study-schedule.FormsOfEducationTitle")}
            options={[
              {
                label: t("app.store.study-schedule.FormsOfEducationTitle"),
                value: {
                  fieldName: "form_of_education",
                  substring: null,
                },
              },
              ...getEnumValues(EFormsOfEducation).map((_, index) => ({
                value: {
                  fieldName: "form_of_education",
                  substring: index + 1,
                },
                label: t(
                  `app.store.study-schedule.FormsOfEducation.${index + 1}`,
                ),
              })),
            ]}
          />
        </StyledFilterItem>
      </StyledFilterRow>
    );
  }

  if (type === EStudyScheduleTypes.COLLEGE) {
    return (
      <StyledFilterRow>
        <StyledFilterItem>
          <Select
            isOnlyText={true}
            onChange={handleFilterSelect}
            valueResolver={(option: TGroupFilter): boolean =>
              option.value.substring ===
              groupFilters.year_of_education?.value.substring
            }
            placeholder={t("app.store.study-schedule.YearsOfEducationTitle")}
            options={[
              {
                label: t("app.store.study-schedule.YearsOfEducationTitle"),
                value: {
                  fieldName: "year_of_education",
                  substring: null,
                },
              },
              ...getEnumValues(EYearsOfEducation).map((_, index) => ({
                value: {
                  fieldName: "year_of_education",
                  substring: index + 1,
                },
                label: `${index + 1} ${t(
                  `app.store.study-schedule.YearsOfEducation`,
                )}`,
              })),
            ]}
          />
        </StyledFilterItem>

        <StyledFilterItem>
          <Select
            isOnlyText={true}
            onChange={handleFilterSelect}
            valueResolver={(option: TGroupFilter): boolean =>
              option.value.substring ===
              groupFilters.form_of_education?.value.substring
            }
            placeholder={t("app.store.study-schedule.FormsOfEducationTitle")}
            options={[
              {
                label: t("app.store.study-schedule.FormsOfEducationTitle"),
                value: {
                  fieldName: "form_of_education",
                  substring: null,
                },
              },
              ...getEnumValues(EFormsOfEducation).map((_, index) => ({
                value: {
                  fieldName: "form_of_education",
                  substring: index + 1,
                },
                label: t(
                  `app.store.study-schedule.FormsOfEducation.${index + 1}`,
                ),
              })),
            ]}
          />
        </StyledFilterItem>
      </StyledFilterRow>
    );
  }

  if (type === EStudyScheduleTypes.SCHOOL) {
    return (
      <StyledFilterRow>
        <StyledFilterItem>
          <Select
            isOnlyText={true}
            onChange={handleFilterSelect}
            valueResolver={(option: TGroupFilter): boolean =>
              option.value.substring ===
              groupFilters.year_of_education?.value.substring
            }
            placeholder={t(
              "app.store.study-schedule.YearsOfEducationSchoolTitle",
            )}
            options={[
              {
                label: t(
                  "app.store.study-schedule.YearsOfEducationSchoolTitle",
                ),
                value: {
                  fieldName: "year_of_education",
                  substring: null,
                },
              },
              ...getEnumValues(EYearsOfEducationSchool).map((_, index) => ({
                value: {
                  fieldName: "year_of_education",
                  substring: index + 1,
                },
                label: `${index + 1} ${t(
                  `app.store.study-schedule.YearsOfEducationSchool`,
                )}`,
              })),
            ]}
          />
        </StyledFilterItem>
        <StyledFilterItem>
          <Select
            isOnlyText={true}
            onChange={handleFilterSelect}
            valueResolver={(option: TGroupFilter): boolean =>
              option.value.substring === groupFilters.degree?.value.substring
            }
            placeholder={t(
              "app.store.study-schedule.LevelsOfEducationSchoolTitle",
            )}
            options={[
              {
                label: t(
                  "app.store.study-schedule.LevelsOfEducationSchoolTitle",
                ),
                value: {
                  fieldName: "degree",
                  substring: null,
                },
              },
              ...getEnumValues(ELevelsOfEducationSchool).map(
                (label, index) => ({
                  value: {
                    fieldName: "degree",
                    substring: index,
                  },
                  label,
                }),
              ),
            ]}
          />
        </StyledFilterItem>
      </StyledFilterRow>
    );
  }

  return <></>;
};
