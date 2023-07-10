import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@ui/components/card/Card";
import { RemoveButton } from "@ui/components/remove-button/RemoveButton";
import { useAppDispatch } from "@store/hooks";
import { buildingSlice } from "@store/modules";
import { deleteBuildingAction } from "@store/modules/study-schedule/sections/building/actions";
import { IBuildingEntity } from "@domain/entity/study-schedule";

interface BuildingItemProps {
  buildingItem: IBuildingEntity;
}

export const BuildingItem: React.FC<BuildingItemProps> = (
  props: BuildingItemProps,
) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const dropdownMenu = {
    items: [
      {
        name: t("app.dropdownMenu.remove"),
        component: RemoveButton,
        props: {
          headerTitle: t(
            "app.features.study-schedule.building.RemoveHeaderTitle",
          ),
          onRemoveComplete: () =>
            props.buildingItem.id
              ? dispatch(deleteBuildingAction(props.buildingItem.id))
              : {},
        },
      },
      {
        name: t("app.dropdownMenu.edit"),
        props: {
          onClick(): void {
            dispatch(
              buildingSlice.actions.setBuildingEditModalStatus({
                status: true,
                itemId: props.buildingItem.id,
              }),
            );
          },
        },
      },
    ],
  };

  return (
    <Card
      headerTitle={props.buildingItem.name}
      text={props.buildingItem.building_classrooms
        .map((item) => item.name)
        .join(", ")}
      description={props.buildingItem.address}
      dropdownMenu={dropdownMenu}
    />
  );
};
