import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/rootReducer";
import { ISettingsStore } from "@domain/entity/study-schedule";

export const selectStudyScheduleSettings = (state: RootState): ISettingsStore =>
  state.modules.studySchedule.settings;

export const selectStudyScheduleSettingsCurrentMode = createSelector(
  selectStudyScheduleSettings,
  (settings) =>
    settings.modes?.find((item) => item.id === settings.currentModeId),
);
