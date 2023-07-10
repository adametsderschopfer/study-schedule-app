import React from "react";
import { useTranslation } from "react-i18next";
import { Select } from "@ui/components/select/Select";
import { LoadOptionsResult, SelectProps } from "@ui/components/select/types";
import { TSelectData } from "@domain/app";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";
import { IBuildingEntity } from "@domain/entity/study-schedule/index";

type Entity = IBuildingEntity;

export const BuildingSelect: React.FC<SelectProps> = (props) => {
  const { t } = useTranslation();

  const loadOptions = async (
    page: number,
    loadedOptions: TSelectData<Entity>[],
  ): Promise<LoadOptionsResult> => {
    const buildings = await StudyScheduleApi.building.getBuildings({
      page,
    });

    const options = buildings.data.map((building) => ({
      label: building.name,
      value: building,
    }));

    return {
      options,
      hasMore: options.length + loadedOptions.length !== buildings.total,
      page: page,
    };
  };

  return (
    <Select
      label={t(
        "app.pages.StudySchedule.orgStructure.schedule.fieldBuildingTitle",
      )}
      placeholder={t(
        "app.pages.StudySchedule.orgStructure.schedule.fieldBuildingPlaceholder",
      )}
      loadOptions={loadOptions}
      isWide={true}
      infiniteScrollProps={{
        pageStart: 1,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        initialLoad: true,
        hasMore: true,
      }}
      {...props}
    />
  );
};
