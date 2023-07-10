import React from "react";
import { Input } from "@ui/components/input/Input";
import { StyledControlRow } from "@ui/components/layout/Control";
import { Select } from "@ui/components/select/Select";
import { TSelectData } from "@domain/app";
import { StyledFieldsWrapper } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/styled";
import { GroupFormFieldsProps } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/types";
import { useGroupForms } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/useGroupForms";

export const GroupFormFieldsCollege: React.FC<GroupFormFieldsProps> = (
  props,
) => {
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
    getValues,
  } = props.form;

  const {
    translation: { t },
    formsOptions,
    yearsOptions,
  } = useGroupForms();

  return (
    <StyledFieldsWrapper>
      <StyledControlRow>
        <Input
          {...register("name")}
          isValid={!errors.name}
          errorMessage={errors.name?.message}
          label={t("collegeNameFieldTitle")}
          placeholder={t("collegeNameFieldPlaceholder")}
          isWide={true}
        />
      </StyledControlRow>

      <StyledControlRow>
        <Select
          isValid={!errors.year_of_education}
          errorMessage={errors.year_of_education?.message}
          label={t("collegeCourseFieldTitle")}
          onChange={({ value }: TSelectData<number>): void => {
            clearErrors("year_of_education");
            setValue("year_of_education", value);
          }}
          valueResolver={(option: TSelectData<number>): boolean =>
            option.value === getValues("year_of_education")
          }
          placeholder={t("collegeCourseFieldPlaceholder")}
          isWide={true}
          options={yearsOptions}
        />

        <Select
          isValid={!errors.form_of_education}
          errorMessage={errors.form_of_education?.message}
          label={t("collegeFormOfEducationFieldTitle")}
          placeholder={t("collegeFormOfEducationFieldPlaceholder")}
          isWide={true}
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
    </StyledFieldsWrapper>
  );
};
