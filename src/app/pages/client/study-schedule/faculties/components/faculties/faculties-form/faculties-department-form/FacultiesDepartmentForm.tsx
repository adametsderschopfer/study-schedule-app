import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/components/button/Button";
import { StyledFormInputLast } from "@ui/components/input/Input";
import { StyledCancelButton } from "@ui/components/modals/styled";
import { TFormPropsBase } from "@domain/app";
import { TDepartmentInputs } from "@domain/entity/study-schedule/index";
import {
  lengthMoreThan3ErrorMessage,
  requiredErrorMessage,
} from "@app/i18n/defaults";

const validationScheme = yup.object().shape({
  name: yup
    .string()
    .required(requiredErrorMessage)
    .min(3, lengthMoreThan3ErrorMessage),
});

export const DepartmentForm: React.FC<TFormPropsBase<TDepartmentInputs>> = (
  props,
) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TDepartmentInputs>({
    defaultValues: props.defaultValues,
    resolver: yupResolver(validationScheme),
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <StyledFormInputLast
        {...register("name")}
        isWide={true}
        label={t(
          `app.pages.StudySchedule.orgStructure.faculties.fieldDepartmentName`,
        )}
        placeholder={t(
          `app.pages.StudySchedule.orgStructure.faculties.fieldPlaceholderDepartmentName`,
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
    </form>
  );
};
