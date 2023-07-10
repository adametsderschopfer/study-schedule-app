import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/components/button/Button";
import { TFormPropsBase } from "@domain/app";
import { TGroupInputs } from "@domain/entity/study-schedule/index";
import { GroupFormFields } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/group-form-fields/GroupFormFields";
import { StyledButtonRow } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/styled";
import { useValidationShapeByModuleType } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/useValidationShapeByModuleType";

export const GroupForm: React.FC<TFormPropsBase<TGroupInputs>> = (props) => {
  const { t } = useTranslation();
  const validationScheme = useValidationShapeByModuleType();

  const form = useForm<TGroupInputs>({
    defaultValues: props.defaultValues,
    resolver: yupResolver(yup.object().shape(validationScheme)),
  });

  return (
    <form onSubmit={form.handleSubmit(props.onSubmit)}>
      <GroupFormFields form={form} />

      <StyledButtonRow>
        {!!props.defaultValues && (
          <Button mode={"wide"} isOutline={true} onClick={props.onRequestClose}>
            {t("app.modals.cancel")}
          </Button>
        )}

        <Button mode={"wide"} type={"submit"}>
          {t("app.modals.save")}
        </Button>
      </StyledButtonRow>
    </form>
  );
};
