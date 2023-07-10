import { createSlice } from "@reduxjs/toolkit";
import { getFacultiesDepartmentInfo } from "@store/modules/study-schedule/sections/faculties/sections/department/actions";
import { IFacultyDepartmentDetailStore } from "@domain/entity/study-schedule";

const initialState: IFacultyDepartmentDetailStore = {
  loading: "loading",
  detailInfo: undefined,
};

export const departmentDetailSlice = createSlice({
  name: "StudySchedule/departmentDetailSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFacultiesDepartmentInfo.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getFacultiesDepartmentInfo.fulfilled, (state, { payload }) => {
        if (payload) {
          if (!payload.department) {
            state.loading = "error";
            return;
          }

          state.detailInfo = payload;
        }

        state.loading = "idle";
      })
      .addCase(getFacultiesDepartmentInfo.rejected, (state) => {
        state.loading = "error";
      });
  },
});
