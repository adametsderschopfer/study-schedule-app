import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/components/button/Button";
import { StyledControlRow } from "@ui/components/layout/Control";
import { TFormPropsBase } from "@domain/app";
import {
  EScheduleRepeatability,
  EScheduleType,
  ESubGroupList,
  TScheduleInputs,
} from "@domain/entity/study-schedule/index";
import { GroupScheduleFields } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-fields/GroupScheduleFields";
import { useScheduleStaticFields } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-form/useScheduleStaticFields";
import { useValidationShapeByModuleType } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-form/useValidationShapeByModuleType";

export const GroupScheduleForm: React.FC<TFormPropsBase<TScheduleInputs>> = (
  props,
) => {
  const staticFields = useScheduleStaticFields();
  const validationScheme = useValidationShapeByModuleType();

  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      sub_group: ESubGroupList.GROUP_COMMON,
      repeatability: EScheduleRepeatability.EVERY_WEEK,
      type: EScheduleType.LECTURE,
      schedule_setting_item_order: 0,

      ...props.defaultValues,
    } as TScheduleInputs,
    resolver: yupResolver(yup.object().shape(validationScheme)),
  });

  return (
    <form onSubmit={form.handleSubmit(props.onSubmit)}>
      <GroupScheduleFields fields={{ ...staticFields.fields }} form={form} />

      <StyledControlRow isIndentDisabled={true}>
        <Button mode={"wide"} isOutline={true} onClick={props.onRequestClose}>
          {t("app.modals.cancel")}
        </Button>

        <Button mode={"wide"} type={"submit"}>
          {t("app.modals.save")}
        </Button>
      </StyledControlRow>
    </form>
  );
};
