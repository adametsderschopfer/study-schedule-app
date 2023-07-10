import { createSelector } from "@reduxjs/toolkit";
import { searchStringCreator } from "@utils/searchStringCreator";
import { RootState } from "@store/rootReducer";
import { IBuildingStore } from "@domain/entity/study-schedule";

export const selectStudyScheduleBuilding = (state: RootState): IBuildingStore =>
  state.modules.studySchedule.building;

export const selectStudyScheduleBuildingCurrentBuilding = createSelector(
  selectStudyScheduleBuilding,
  (state) => state.list.find((item) => item.id === state.editModal.itemId),
);

export const selectStudyScheduleBuildingSearchString = (
  state: RootState,
): string =>
  searchStringCreator(state.modules.studySchedule.building.searchValue || "");
