import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/components/button/Button";
import {
  StyledFormInput,
  StyledFormInputLast,
} from "@ui/components/input/Input";
import { StyledCancelButton } from "@ui/components/modals/styled";
import { useAppSelector } from "@store/hooks";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { TFormPropsBase } from "@domain/app";
import { TTeacherInputs } from "@domain/entity/study-schedule/index";
import {
  lengthMoreThan3ErrorMessage,
  requiredErrorMessage,
} from "@app/i18n/defaults";

const validationScheme = yup.object().shape({
  full_name: yup
    .string()
    .required(requiredErrorMessage)
    .min(3, lengthMoreThan3ErrorMessage),
  position: yup.string().nullable(),
  degree: yup
    .string()
    .required(requiredErrorMessage)
    .min(3, lengthMoreThan3ErrorMessage),
});

export const TeachersForm: React.FC<TFormPropsBase<TTeacherInputs>> = (
  props,
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTeacherInputs>({
    defaultValues: props.defaultValues,
    resolver: yupResolver(validationScheme),
  });
  const { type: moduleType } = useAppSelector(selectStudySchedule);
  const { t: tTeachers } = useTranslation("", {
    keyPrefix: "app.pages.StudySchedule.orgStructure.teachers",
  });
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <StyledFormInput
        {...register("full_name")}
        label={tTeachers(`modalFieldFIOTitle.${moduleType}`)}
        placeholder={tTeachers(`modalFieldFIOPlaceholder.${moduleType}`)}
        isWide={true}
        isValid={!errors["full_name"]}
        errorMessage={errors["full_name"]?.message}
      />
      <StyledFormInput
        {...register("position")}
        label={tTeachers(`modalFieldPositionTitle.${moduleType}`)}
        placeholder={tTeachers(`modalFieldPositionPlaceholder.${moduleType}`)}
        isWide={true}
        isValid={!errors["position"]}
        errorMessage={errors["position"]?.message}
      />
      <StyledFormInputLast
        {...register("degree")}
        label={tTeachers(`modalFieldDegreeTitle.${moduleType}`)}
        placeholder={tTeachers(`modalFieldDegreePlaceholder.${moduleType}`)}
        isWide={true}
        isValid={!errors["degree"]}
        errorMessage={errors["degree"]?.message}
      />

      {!!props.defaultValues && (
        <StyledCancelButton onClick={props.onRequestClose}>
          {t("app.modals.cancel")}
        </StyledCancelButton>
      )}

      <Button mode={"wide"} type={"submit"}>
        {t("app.modals.save")}
      </Button>
    </form>
  );
};
