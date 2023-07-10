import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@store/hooks";
import { settingsSlice } from "@store/modules";
import { StyledSettingsModesAddButton } from "@app/pages/client/study-schedule/settings/components/settings-modes/settings-modes-add-button/styled";

export const SettingsModesAddButton: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <StyledSettingsModesAddButton
      mode={"wide"}
      onClick={(): void => {
        dispatch(settingsSlice.actions.setModeCreateModalStatus(true));
      }}
    >
      {t("app.features.study-schedule.settings.settings-modes.add")}
    </StyledSettingsModesAddButton>
  );
};
