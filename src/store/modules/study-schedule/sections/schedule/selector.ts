import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/rootReducer";
import { createScheduleTableSelector } from "@domain/entity/study-schedule/data";
import { IScheduleStore } from "@domain/entity/study-schedule/index";

export const selectSchedule = (state: RootState): IScheduleStore =>
  state.modules.studySchedule.schedule;

export const selectScheduleTable = createSelector(
  selectSchedule,
  createScheduleTableSelector,
);

export const selectScheduleDisplayUrl = createSelector(
  selectSchedule,
  (schedule) => {
    const url = new URL(
      "/client/study-schedule/schedule/display",
      window.location.href,
    );
    const { date_start, date_end } = schedule.filter;
    const excludeFields = ["date_start", "date_end"];

    if (date_start) {
      url.searchParams.set("date_start", date_start);
      url.searchParams.set("date_end", date_end || date_start);

      Object.entries(schedule.filter).map(([key, _value]): void => {
        const value = _value;

        if (!excludeFields.includes(key) && value) {
          url.searchParams.set(key, value.toString());
        }
      });
    }

    return url.pathname + url.search;
  },
);
