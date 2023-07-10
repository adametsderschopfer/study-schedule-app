import React from "react";
import { useTranslation } from "react-i18next";
import { BaseModal } from "@ui/components/modals/BaseModal";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { buildingSlice } from "@store/modules";
import { editBuildingAction } from "@store/modules/study-schedule/sections/building/actions";
import {
  selectStudyScheduleBuilding,
  selectStudyScheduleBuildingCurrentBuilding,
} from "@store/modules/study-schedule/sections/building/selector";
import { BuildingForm } from "@app/pages/client/study-schedule/building/components/building-form/BuildingForm";

export const BuildingModalEdit: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const building = useAppSelector(selectStudyScheduleBuilding);
  const currentBuilding = useAppSelector(
    selectStudyScheduleBuildingCurrentBuilding,
  );

  const onRequestClose = (): void => {
    dispatch(
      buildingSlice.actions.setBuildingEditModalStatus({
        status: false,
        itemId: undefined,
      }),
    );
  };

  return (
    <BaseModal
      isOpen={building.editModal.isShown || false}
      headerTitle={t(
        "app.features.study-schedule.building.buildingModalEditTitle",
      )}
      loading={building.editModal.loading}
      onRequestClose={onRequestClose}
    >
      {currentBuilding ? (
        <BuildingForm
          defaultValues={currentBuilding}
          onRequestClose={onRequestClose}
          onSubmit={(data): void => {
            dispatch(
              editBuildingAction({
                id: currentBuilding.id,
                ...data,
              }),
            );
          }}
        />
      ) : (
        <p>currentBuilding is undefined</p>
      )}
    </BaseModal>
  );
};
