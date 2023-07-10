import React from "react";
import { Input } from "@ui/components/input/Input";
import { StyledControlRow } from "@ui/components/layout/Control";
import { Select } from "@ui/components/select/Select";
import { TeacherSelect } from "@ui/components/study-schedule/select/TeacherSelect";
import { TSelectData } from "@domain/app";
import { ITeacherEntity } from "@domain/entity/study-schedule/index";
import { StyledFieldsWrapper } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/group-form-fields/group-form-fields-school/styled";
import { GroupFormFieldsProps } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/types";
import { useGroupForms } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/useGroupForms";

export const GroupFormFieldsSchool: React.FC<GroupFormFieldsProps> = (
  props,
) => {
  const {
    translation: { t },
    yearsOptions,
    degreeOptions,
  } = useGroupForms();

  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
    getValues,
  } = props.form;

  return (
    <StyledFieldsWrapper>
      <StyledControlRow>
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
          label={t("schoolClassroomFieldTitle")}
          placeholder={t("schoolClassroomFieldPlaceholder")}
          isWide={true}
          options={yearsOptions}
        />

        <Select
          isValid={!errors.letter}
          errorMessage={errors.letter?.message}
          onChange={({ value }: TSelectData<string>): void => {
            clearErrors("letter");
            setValue("letter", value);
          }}
          valueResolver={(option: TSelectData<string>): boolean =>
            option.value === getValues("letter")
          }
          label={t("schoolLevelFieldTitle")}
          placeholder={t("schoolLevelFieldPlaceholder")}
          isWide={true}
          options={degreeOptions}
        />
      </StyledControlRow>

      <StyledControlRow>
        <TeacherSelect
          isValid={!errors.teacher_id}
          errorMessage={errors.teacher_id?.message}
          onChange={({ value }: TSelectData<ITeacherEntity>): void => {
            setValue("teacher_id", value.id);
            clearErrors("teacher_id");
          }}
          valueResolver={(option: TSelectData<ITeacherEntity>): boolean =>
            option.value.id === getValues("teacher_id")
          }
          value={
            props.currentEditGroup?.teacher
              ? {
                  label: props.currentEditGroup?.teacher.full_name,
                  value: props.currentEditGroup?.teacher,
                }
              : undefined
          }
        />
      </StyledControlRow>

      <StyledControlRow isLast={true}>
        <Input
          {...register("name")}
          label={t("schoolNameFieldTitle")}
          placeholder={t("schoolNameFieldPlaceholder")}
          isWide={true}
          errorMessage={errors.name?.message}
          isValid={!errors.name}
        />
      </StyledControlRow>
    </StyledFieldsWrapper>
  );
};
