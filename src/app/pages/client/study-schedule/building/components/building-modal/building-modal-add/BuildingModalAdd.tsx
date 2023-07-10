import React from "react";
import { useTranslation } from "react-i18next";
import { BaseModal } from "@ui/components/modals/BaseModal";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { buildingSlice } from "@store/modules";
import { createBuildingAction } from "@store/modules/study-schedule/sections/building/actions";
import { selectStudyScheduleBuilding } from "@store/modules/study-schedule/sections/building/selector";
import { BuildingForm } from "@app/pages/client/study-schedule/building/components/building-form/BuildingForm";

export const BuildingModalAdd: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const building = useAppSelector(selectStudyScheduleBuilding);

  return (
    <BaseModal
      isOpen={building.createModal.isShown}
      loading={building.createModal.loading}
      headerTitle={t(
        "app.features.study-schedule.building.buildingModalAddTitle",
      )}
      onRequestClose={(): void => {
        dispatch(buildingSlice.actions.setBuildingCreateModalStatus(false));
      }}>
      <BuildingForm
        onSubmit={(data): void => {
          dispatch(createBuildingAction(data));
        }}
      />
    </BaseModal>
  );
};
