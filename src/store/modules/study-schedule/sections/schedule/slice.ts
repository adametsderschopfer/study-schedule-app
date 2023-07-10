import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "i18next";
import { DateTime } from "luxon";
import { toast } from "react-toastify";
import {
  downloadScheduleAsXLS,
  loadScheduleContent,
} from "@store/modules/study-schedule/sections/schedule/actions";
import { DATE_FORMAT } from "@domain/app";
import { processSchedulesRepeatabilities } from "@domain/entity/study-schedule/data";
import {
  IScheduleStore,
  TScheduleSetFilterPayload,
} from "@domain/entity/study-schedule/index";

export const createYMDDAteString = (date = new Date()): string =>
  DateTime.fromJSDate(date).toFormat(DATE_FORMAT);

const initialState: IScheduleStore = {
  list: [],
  displayLoading: "loading",
  xlsLoading: "idle",
  loading: "loading",
  filter: {
    date_start: createYMDDAteString(),
    date_end: createYMDDAteString(),
  },
};

export const scheduleSlice = createSlice({
  name: "study-schedule/scheduleSlice",
  initialState,
  reducers: {
    setFilter(state, { payload }: PayloadAction<TScheduleSetFilterPayload>) {
      if (payload.name === "date_start") {
        state.filter = {
          ...state.filter,
          date_start: payload.value as unknown as string,
          date_end: undefined,
        };
      }

      state.filter = {
        ...state.filter,
        [payload.name]: payload.value,
      };
    },
    clearFilter(
      state,
      { payload }: PayloadAction<{ isIgnoreDate?: boolean } | undefined>,
    ) {
      payload = payload || {};

      state.list = [];

      if (!payload.isIgnoreDate) {
        state.filter = {
          date_start: createYMDDAteString(),
          date_end: createYMDDAteString(),
        };
      } else {
        state.filter = {
          date_start: state.filter.date_start,
          date_end: state.filter.date_end,
        };
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadScheduleContent.pending, (state) => {
        state.displayLoading = "loading";
      })
      .addCase(loadScheduleContent.fulfilled, (state, { payload }) => {
        state.displayLoading = "idle";
        state.list = processSchedulesRepeatabilities(payload);
      })
      .addCase(loadScheduleContent.rejected, (state) => {
        state.displayLoading = "error";
        toast.error(i18n.t("app.request.failedLoad"));
      });

    builder
      .addCase(downloadScheduleAsXLS.pending, (state) => {
        state.xlsLoading = "loading";
      })
      .addCase(downloadScheduleAsXLS.fulfilled, (state) => {
        state.xlsLoading = "idle";
      })
      .addCase(downloadScheduleAsXLS.rejected, (state) => {
        state.xlsLoading = "error";
        toast.error(i18n.t("app.request.failedLoad"));
      });
  },
});
