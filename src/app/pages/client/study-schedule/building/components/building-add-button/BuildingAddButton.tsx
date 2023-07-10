import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@store/hooks";
import { buildingSlice } from "@store/modules/study-schedule/sections/building/slice";
import { StyledBuildingAddButton } from "@app/pages/client/study-schedule/building/components/building-add-button/styled";

export const BuildingAddButton: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <StyledBuildingAddButton
      onClick={(): void => {
        dispatch(buildingSlice.actions.setBuildingCreateModalStatus(true));
      }}
    >
      {t("app.features.study-schedule.building.addBuildingButton")}
    </StyledBuildingAddButton>
  );
};
