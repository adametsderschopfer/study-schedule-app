import { combineReducers } from "@reduxjs/toolkit";
import {
  appSlice,
  buildingSlice,
  departmentDetailSlice,
  facultySlice,
  groupScheduleSlice,
  groupSlice,
  loginSlice,
  scheduleSlice,
  settingsSlice,
  studyScheduleSlice,
  subjectSlice,
  teachersSlice,
  userSlice,
} from "@store/modules";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  app: appSlice.reducer,

  auth: combineReducers({
    login: loginSlice.reducer,
  }),

  modules: combineReducers({
    studySchedule: combineReducers({
      root: studyScheduleSlice.reducer,

      schedule: scheduleSlice.reducer,
      building: buildingSlice.reducer,
      settings: settingsSlice.reducer,
      orgStructure: combineReducers({
        faculty: facultySlice.reducer,
        teachers: teachersSlice.reducer,
        subject: subjectSlice.reducer,
        group: groupSlice.reducer,
        schedule: groupScheduleSlice.reducer,
        departmentDetailSlice: departmentDetailSlice.reducer,
      }),
    }),
  }),
});

export type RootState = ReturnType<typeof rootReducer>;
