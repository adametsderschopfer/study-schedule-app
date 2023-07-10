import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/components/button/Button";
import { StyledFormInput } from "@ui/components/input/Input";
import { BaseModal } from "@ui/components/modals/BaseModal";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { settingsSlice } from "@store/modules/index";
import { createModeAction } from "@store/modules/study-schedule/sections/settings/actions";
import { selectStudyScheduleSettings } from "@store/modules/study-schedule/sections/settings/selector";
import { TModeCreateAction } from "@domain/entity/study-schedule/index";
import {
  lengthMoreThan3ErrorMessage,
  requiredErrorMessage,
} from "@app/i18n/defaults";
import { StyledCountChooserField } from "@app/pages/client/study-schedule/settings/components/settings-modes/settings-modes-modal/settings-modes-modal-creator/styled";

const baseLangPath =
  "app.features.study-schedule.settings.settings-modes.modalCreator";

const validationScheme = yup
  .object()
  .shape({
    name: yup
      .string()
      .required(requiredErrorMessage)
      .min(3, lengthMoreThan3ErrorMessage),
    lessonCount: yup.string().required(requiredErrorMessage),
  })
  .required();

export const SettingsModesModalCreator: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<TModeCreateAction>({
    resolver: yupResolver(validationScheme),
    defaultValues: {
      lessonCount: 5,
    },
  });
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectStudyScheduleSettings);
  const { t } = useTranslation();

  useEffect(() => {
    if (!settings.modeModalCreate.isShown) {
      reset();
    }
  }, [settings.modeModalCreate.isShown]);

  const onFormSubmit = (modeItem: TModeCreateAction): void => {
    dispatch(createModeAction(modeItem));
  };

  return (
    <BaseModal
      headerTitle={t(`${baseLangPath}.headerTitle`)}
      isOpen={settings.modeModalCreate.isShown}
      loading={settings.modeModalCreate.loading}
      onRequestClose={(): void => {
        dispatch(settingsSlice.actions.setModeCreateModalStatus(false));
      }}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <StyledFormInput
          {...register("name")}
          label={t(`${baseLangPath}.field_name`)}
          placeholder={t(`${baseLangPath}.field_name_placeholder`)}
          isWide={true}
          errorMessage={errors.name?.message}
          isValid={!errors.name}
        />

        <StyledCountChooserField
          label={t(`${baseLangPath}.field_lessons`)}
          hint={t(`${baseLangPath}.field_lessons_hint`)}
          currentCount={watch("lessonCount")}
          onCountSelect={(count): void => {
            setValue("lessonCount", count);
          }}
        />

        <Button type={"submit"} mode={"wide"}>
          {t(`${baseLangPath}.saveButton`)}
        </Button>
      </form>
    </BaseModal>
  );
};
