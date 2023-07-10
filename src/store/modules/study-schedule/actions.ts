import { createAsyncThunk } from "@reduxjs/toolkit";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";
import { TLoadStudyScheduleUserDataResponse } from "@domain/entity/study-schedule/index";

export const loadStudyScheduleUserDataAction =
  createAsyncThunk<TLoadStudyScheduleUserDataResponse>(
    "study-schedule/loadStudyScheduleUserDataAction",
    async () => {
      return await StudyScheduleApi.root.getUser();
    },
  );
