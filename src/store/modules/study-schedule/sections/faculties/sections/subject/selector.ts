import { createSelector } from "@reduxjs/toolkit";
import { searchStringCreator } from "@utils/searchStringCreator";
import { RootState } from "@store/rootReducer";
import { ISubjectStore } from "@domain/entity/study-schedule/index";

export const selectStudyScheduleFacultySubject = (
  state: RootState,
): ISubjectStore => state.modules.studySchedule.orgStructure.subject;

export const selectStudyScheduleFacultySubjectSearchString = (
  state: RootState,
): string =>
  searchStringCreator(
    state.modules.studySchedule.orgStructure.subject.searchValue || "",
  );

export const selectStudyScheduleSubjectEditCurrent = createSelector(
  selectStudyScheduleFacultySubject,
  (state) => state.list.find((item) => item.id === state.editModal.itemId),
);
