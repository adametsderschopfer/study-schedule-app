import { createAsyncThunk } from "@reduxjs/toolkit";
import { appSlice } from "@store/modules/index";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";
import {
  IScheduleApiResult,
  TGetScheduleParams,
} from "@domain/entity/study-schedule/index";

export const loadScheduleContent = createAsyncThunk<
  IScheduleApiResult,
  TGetScheduleParams
>("schedule/loadScheduleContent", async (filterParams, { dispatch }) => {
  dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    return await StudyScheduleApi.schedule.getSchedules(filterParams);
  } catch (error) {
    console.error(error);
    return Promise.reject();
  } finally {
    dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const downloadScheduleAsXLS = createAsyncThunk<Blob, TGetScheduleParams>(
  "schedule/exportSchedulesToCsv",
  async (filterParams, { dispatch }) => {
    dispatch(appSlice.actions.setActionLoaderStatus(true));

    try {
      return await StudyScheduleApi.schedule.exportSchedulesToCsv(filterParams);
    } catch (error) {
      console.error(error);
      return Promise.reject();
    } finally {
      dispatch(appSlice.actions.setActionLoaderStatus(false));
    }
  },
);
