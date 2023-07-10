import { createAsyncThunk } from "@reduxjs/toolkit";
import { appSlice } from "@store/modules";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { RootState } from "@store/rootReducer";
import {
  EStudyScheduleTypes,
  IDepartmentEntity,
  IFacultyDepartmentDetailEntity,
} from "@domain/entity/study-schedule";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";

export type TFDInfoParams = {
  facultyId: Id;
  departmentId: Id;
};

export const getFacultiesDepartmentInfo = createAsyncThunk<
  IFacultyDepartmentDetailEntity | null,
  TFDInfoParams,
  {
    state: RootState;
  }
>(
  "departmentDetailSlice/getFacultiesDepartmentInfo",
  async ({ departmentId, facultyId }, thunkAPI) => {
    const { type } = selectStudySchedule(thunkAPI.getState());

    if (type === EStudyScheduleTypes.SCHOOL) {
      return null;
    }

    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

    try {
      if (type === EStudyScheduleTypes.COLLEGE) {
        const faculty = await StudyScheduleApi.faculty.getFaculty(facultyId);
        return {
          name: faculty.name,
          id: facultyId,
          departments: [],
          department: {} as IDepartmentEntity,
        };
      }

      return await StudyScheduleApi.faculty.getFacultiesDepartmentInfo(
        facultyId,
        departmentId,
      );
    } catch (error) {
      return Promise.reject();
    } finally {
      thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
    }
  },
);
