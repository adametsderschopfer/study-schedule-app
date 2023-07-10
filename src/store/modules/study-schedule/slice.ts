import { createSlice } from "@reduxjs/toolkit";
import { getEnumValues } from "@utils/helper";
import { loadStudyScheduleUserDataAction } from "@store/modules/study-schedule/actions";
import {
  EStudyScheduleTypes,
  IStudyScheduleStore,
} from "@domain/entity/study-schedule";

const initialState = {
  type: EStudyScheduleTypes.UNIVERSITY,
  loading: "loading",
} as IStudyScheduleStore;

export const studyScheduleSlice = createSlice({
  name: "StudySchedule",
  initialState,
  reducers: {
    changeType(state, { payload }) {
      state.type = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadStudyScheduleUserDataAction.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(
        loadStudyScheduleUserDataAction.fulfilled,
        (state, { payload }) => {
          const types = getEnumValues(EStudyScheduleTypes);
          const type = types[payload.type] as EStudyScheduleTypes;

          if (!type) {
            state.loading = "error";
            return;
          }

          state.type = type;
          state.loading = "idle";
        },
      )
      .addCase(loadStudyScheduleUserDataAction.rejected, (state) => {
        state.loading = "error";
      });
  },
});
