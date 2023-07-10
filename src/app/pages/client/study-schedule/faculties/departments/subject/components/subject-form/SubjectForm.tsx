import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/components/button/Button";
import { Checkbox } from "@ui/components/checkbox/Checkbox";
import { StyledCheckboxField } from "@ui/components/checkbox/styled";
import { StyledFormInput } from "@ui/components/input/Input";
import { StyledCancelButton } from "@ui/components/modals/styled";
import { useAppSelector } from "@store/hooks";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { TFormPropsBase } from "@domain/app";
import {
  EStudyScheduleTypes,
  TSubjectActionInputs,
} from "@domain/entity/study-schedule/index";
import {
  lengthMoreThan3ErrorMessage,
  requiredErrorMessage,
} from "@app/i18n/defaults";

type SubjectFormProps = TFormPropsBase<TSubjectActionInputs>;

const validationScheme = yup.object().shape({
  name: yup
    .string()
    .min(3, lengthMoreThan3ErrorMessage)
    .required(requiredErrorMessage),
});

export const SubjectForm: React.FC<SubjectFormProps> = (props) => {
  const { t } = useTranslation();
  const { type } = useAppSelector(selectStudySchedule);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TSubjectActionInputs>({
    resolver: yupResolver(validationScheme),
    defaultValues: {
      name: props.defaultValues?.name,
      isAddInAllDepartments: false,
    },
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <StyledFormInput
        {...register("name")}
        label={t(
          "app.pages.StudySchedule.orgStructure.subject.createModalFieldNameTitle",
        )}
        placeholder={t(
          "app.pages.StudySchedule.orgStructure.subject.createModalFieldNamePlaceholder",
        )}
        isWide={true}
        isValid={!errors["name"]}
        errorMessage={errors["name"]?.message}
      />

      {!props.defaultValues && type === EStudyScheduleTypes.COLLEGE && (
        <StyledCheckboxField>
          <Checkbox
            onCheck={(isChecked): void => {
              setValue("isAddInAllDepartments", isChecked);
            }}
            text={t(
              "app.pages.StudySchedule.orgStructure.subject.createModalFieldAddInAllSpecialist",
            )}
          />
        </StyledCheckboxField>
      )}

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
