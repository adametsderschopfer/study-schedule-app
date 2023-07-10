import { createSelector } from "@reduxjs/toolkit";
import { searchStringCreator } from "@utils/searchStringCreator";
import { RootState } from "@store/rootReducer";
import { ITeacherStore } from "@domain/entity/study-schedule/index";

export const selectStudyScheduleFacultyTeachers = (
  state: RootState,
): ITeacherStore => state.modules.studySchedule.orgStructure.teachers;

export const selectStudyScheduleTeachersCurrentTeacher = createSelector(
  selectStudyScheduleFacultyTeachers,
  (state) => state.list.find((item) => item.id === state.editModal.itemId),
);

export const selectStudyScheduleFacultyTeachersSearchString = (
  state: RootState,
): string =>
  searchStringCreator(
    state.modules.studySchedule.orgStructure.teachers.searchValue || "",
  );
