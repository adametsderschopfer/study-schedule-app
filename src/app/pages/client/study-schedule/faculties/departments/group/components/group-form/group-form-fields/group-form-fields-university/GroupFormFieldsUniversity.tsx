import React, { useEffect, useState } from "react";
import { Input } from "@ui/components/input/Input";
import { StyledControlRow } from "@ui/components/layout/Control";
import { Select } from "@ui/components/select/Select";
import { FacultySelect } from "@ui/components/study-schedule/select/FacultySelect";
import { useAppSelector } from "@store/hooks";
import { selectDetailDepartmentInfo } from "@store/modules/study-schedule/sections/faculties/sections/department/selector";
import { TSelectData } from "@domain/app";
import {
  IFacultyDepartmentDetailEntity,
  IFacultyEntity,
} from "@domain/entity/study-schedule/index";
import { StyledFieldsWrapper } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/styled";
import { GroupFormFieldsProps } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/types";
import { useGroupForms } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/useGroupForms";

export const GroupFormFieldsUniversity: React.FC<GroupFormFieldsProps> = (
  props,
) => {
  const {
    translation: { t },
    formsOptions,
    subgroupOptions,
    degreeOptions,
    yearsOptions,

    initialFacultyOption,
  } = useGroupForms();

  const departmentInfo = useAppSelector(selectDetailDepartmentInfo);

  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
    getValues,
  } = props.form;

  const [faculty, setFaculty] = useState<
    | TSelectData<IFacultyEntity | IFacultyDepartmentDetailEntity | undefined>
    | undefined
  >(initialFacultyOption);

  useEffect(() => {
    if (departmentInfo) {
      setValue("department_id", departmentInfo.department.id);
    }
  }, [departmentInfo]);

  return (
    <StyledFieldsWrapper>
      <StyledControlRow>
        <Input
          {...register("name")}
          isWide={true}
          isValid={!errors.name}
          errorMessage={errors.name?.message}
          label={t("universityNameFieldTitle")}
          placeholder={t("universityNameFieldPlaceholder")}
        />

        <Select
          isWide={true}
          isValid={!errors.sub_group}
          errorMessage={errors.sub_group?.message}
          label={t("universitySubGroupFieldTitle")}
          placeholder={t("universitySubGroupFieldPlaceholder")}
          onChange={({ value }: TSelectData<number>): void => {
            clearErrors("sub_group");
            setValue("sub_group", value);
          }}
          options={subgroupOptions}
          valueResolver={(option: TSelectData<number>): boolean =>
            option.value === getValues("sub_group")
          }
        />
      </StyledControlRow>
      <StyledControlRow>
        <Select
          isWide={true}
          isValid={!errors.degree}
          errorMessage={errors.degree?.message}
          label={t("universityDegreeFieldTitle")}
          placeholder={t("universityDegreeFieldPlaceholder")}
          onChange={({ value }: TSelectData<number>): void => {
            clearErrors("degree");
            setValue("degree", value);
          }}
          valueResolver={(option: TSelectData<number>): boolean =>
            option.value === getValues("degree")
          }
          options={degreeOptions}
        />

        <Select
          isValid={!errors.year_of_education}
          errorMessage={errors.year_of_education?.message}
          onChange={({ value }: TSelectData<number>): void => {
            clearErrors("year_of_education");
            setValue("year_of_education", value);
          }}
          valueResolver={(option: TSelectData<number>): boolean =>
            option.value === getValues("year_of_education")
          }
          isWide={true}
          options={yearsOptions}
          label={t("universityCourseFieldTitle")}
          placeholder={t("universityCourseFieldPlaceholder")}
        />

        <Select
          isWide={true}
          isValid={!errors.form_of_education}
          errorMessage={errors.form_of_education?.message}
          label={t("universityFormOfEducationFieldTitle")}
          placeholder={t("universityFormOfEducationFieldPlaceholder")}
          onChange={({ value }: TSelectData<number>): void => {
            clearErrors("form_of_education");
            setValue("form_of_education", value);
          }}
          valueResolver={(option: TSelectData<number>): boolean =>
            option.value === getValues("form_of_education")
          }
          options={formsOptions}
        />
      </StyledControlRow>
      <StyledControlRow>
        <Select
          isValid={!errors.department_id}
          errorMessage={errors.department_id?.message}
          isWide={true}
          valueResolver={(option: TSelectData<Id>): boolean => {
            return option.value === getValues("department_id");
          }}
          onChange={({ value }: TSelectData<Id>): void => {
            clearErrors("department_id");
            setValue("department_id", value);
          }}
          value={getValues("department_id")}
          options={
            faculty
              ? faculty.value?.departments.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))
              : []
          }
          label={t("universityDepartmentFieldTitle")}
          placeholder={t("universityDepartmentFieldPlaceholder")}
        />
      </StyledControlRow>
      <StyledControlRow isLast={true}>
        <FacultySelect
          onChange={(
            option: TSelectData<
              IFacultyEntity | IFacultyDepartmentDetailEntity
            >,
          ): void => {
            setFaculty(option);
            setValue("department_id", null);
          }}
          value={initialFacultyOption}
          valueResolver={(
            option: TSelectData<
              IFacultyEntity | IFacultyDepartmentDetailEntity
            >,
          ): boolean => {
            const isActive =
              option.value.id === (faculty?.value?.id || departmentInfo?.id);

            if (isActive) {
              queueMicrotask(() => {
                setFaculty(option);
              });
            }

            return isActive;
          }}
        />
      </StyledControlRow>
    </StyledFieldsWrapper>
  );
};
