import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/components/button/Button";
import { StyledFormInputLast } from "@ui/components/input/Input";
import { StyledCancelButton } from "@ui/components/modals/styled";
import { useAppSelector } from "@store/hooks";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { TFormPropsBase } from "@domain/app";
import {
  EStudyScheduleTypes,
  TFacultyInputs,
} from "@domain/entity/study-schedule/index";
import {
  lengthMoreThan3ErrorMessage,
  requiredErrorMessage,
} from "@app/i18n/defaults";
import { StyledFormNotice } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-form/styled";

const validationScheme = yup.object().shape({
  name: yup
    .string()
    .required(requiredErrorMessage)
    .min(3, lengthMoreThan3ErrorMessage),
});

export const FacultyForm: React.FC<TFormPropsBase<TFacultyInputs>> = (
  props,
) => {
  const { type: moduleType } = useAppSelector(selectStudySchedule);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFacultyInputs>({
    defaultValues: props.defaultValues,
    resolver: yupResolver(validationScheme),
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <StyledFormInputLast
        {...register("name")}
        isWide={true}
        label={t(
          `app.pages.StudySchedule.orgStructure.faculties.fieldFacultyName.${moduleType}`,
        )}
        placeholder={t(
          `app.pages.StudySchedule.orgStructure.faculties.fieldPlaceholderFacultyName.${moduleType}`,
        )}
        isValid={!errors.name}
        errorMessage={errors.name?.message}
      />

      {!!props.defaultValues && (
        <StyledCancelButton onClick={props.onRequestClose}>
          {t("app.modals.cancel")}
        </StyledCancelButton>
      )}

      <Button mode={"wide"} type={"submit"}>
        {t("app.modals.save")}
      </Button>

      {!props.defaultValues && moduleType === EStudyScheduleTypes.UNIVERSITY ? (
        <StyledFormNotice>
          {t(
            "app.pages.StudySchedule.orgStructure.faculties.facultyFormNotice",
          )}
        </StyledFormNotice>
      ) : null}
    </form>
  );
};
