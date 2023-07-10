import { createSelector } from "@reduxjs/toolkit";
import { searchStringCreator } from "@utils/searchStringCreator";
import { RootState } from "@store/rootReducer";
import { IFacultyStore } from "@domain/entity/study-schedule";

export const selectStudyScheduleFaculty = (state: RootState): IFacultyStore =>
  state.modules.studySchedule.orgStructure.faculty;

export const selectStudyScheduleFacultyEditCurrentItem = createSelector(
  selectStudyScheduleFaculty,
  (faculty) =>
    faculty.faculties.find(
      (item) => item.id === faculty.editFacultyModal.itemId,
    ),
);

export const selectStudyScheduleFacultyEditCurrentDepartment = createSelector(
  selectStudyScheduleFaculty,
  (faculty) =>
    faculty.faculties
      .find((item) => item.id === faculty.editDepartmentModal.facultyId)
      ?.departments.find(
        (item) => item.id === faculty.editDepartmentModal.itemId,
      ),
);

export const selectStudyScheduleFacultySearchString = (
  state: RootState,
): string =>
  searchStringCreator(
    state.modules.studySchedule.orgStructure.faculty.searchValue || "",
  );
