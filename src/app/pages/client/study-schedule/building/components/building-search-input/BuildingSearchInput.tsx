import React from "react";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "@ui/components/icons/SearchIcon";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { buildingSlice } from "@store/modules";
import { selectStudyScheduleBuilding } from "@store/modules/study-schedule/sections/building/selector";
import { StyledSearchInput } from "@app/pages/client/study-schedule/building/components/building-search-input/styled";

export const BuildingSearchInput: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const building = useAppSelector(selectStudyScheduleBuilding);

  return (
    <StyledSearchInput
      isWide={true}
      icon={<SearchIcon />}
      placeholder={
        t("app.features.study-schedule.building.searchInputPlaceholder") ||
        undefined
      }
      value={building.searchValue}
      onInput={(value: string): void => {
        dispatch(buildingSlice.actions.setSearchValue(value));
      }}
    />
  );
};
