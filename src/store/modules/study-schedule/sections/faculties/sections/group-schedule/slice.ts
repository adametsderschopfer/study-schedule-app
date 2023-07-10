import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "i18next";
import { toast } from "react-toastify";
import { getWeekByDate } from "@store/helpers";
import {
  createScheduleAction,
  deleteScheduleAction,
  editScheduleAction,
  loadSchedulesAction,
  updateDetailGroupInfoAction,
} from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/actions";
import { processSchedulesRepeatabilities } from "@domain/entity/study-schedule/data";
import {
  IGroupEntity,
  IGroupScheduleStore,
  IScheduleItem,
} from "@domain/entity/study-schedule/index";
import { TEditActionPayload } from "@domain/store";

const initialState: IGroupScheduleStore = {
  list: [],
  loading: "loading",

  detailGroup: {} as IGroupEntity,

  createModal: {},
  editModal: {},
};

export const groupScheduleSlice = createSlice({
  name: "study-schedule/groupSchedule",
  initialState,
  reducers: {
    setCreateModalShown(
      state,
      { payload }: PayloadAction<TEditActionPayload<Partial<IScheduleItem>>>,
    ) {
      state.createModal.isShown = payload.status;
      state.createModal.itemId = payload.itemId;
      state.createModal.item = payload.item;
    },
    setEditModalShown(state, { payload }: PayloadAction<TEditActionPayload>) {
      state.editModal.isShown = payload.status;
      state.editModal.itemId = payload.itemId;
    },
    setWeek(state, { payload }: PayloadAction<Date>) {
      state.currentDate = payload;

      const { dateStart, dateEnd } = getWeekByDate(payload);

      if (dateStart === state.dateStart) {
        return;
      }

      state.dateStart = dateStart;
      state.dateEnd = dateEnd;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateDetailGroupInfoAction.pending, (state) => {
        state.loading = "loading";
        state.list = [];
      })
      .addCase(updateDetailGroupInfoAction.fulfilled, (state, { payload }) => {
        state.loading = "still-loading";
        state.detailGroup = payload;
      })
      .addCase(updateDetailGroupInfoAction.rejected, (state) => {
        state.loading = "error";
        toast.error(i18n.t("app.request.failedLoad"));
      });

    builder
      .addCase(loadSchedulesAction.pending, (state) => {
        state.loading = "still-loading";
        state.list = [];
      })
      .addCase(loadSchedulesAction.fulfilled, (state, { payload }) => {
        state.list = processSchedulesRepeatabilities(payload);
        state.loading = "idle";
      })
      .addCase(loadSchedulesAction.rejected, (state) => {
        state.loading = "error";
        toast.error(i18n.t("app.request.failedLoad"));
      });

    builder
      .addCase(
        deleteScheduleAction.fulfilled,
        (state, { payload: scheduleId }) => {
          state.list = state.list.filter((item) => item.id !== scheduleId);

          toast.success(
            i18n.t(
              "app.pages.StudySchedule.orgStructure.schedule.notifyDeleted",
            ),
          );
        },
      )
      .addCase(deleteScheduleAction.rejected, () => {
        toast.error(i18n.t("app.request.failedDelete"));
      });

    builder
      .addCase(createScheduleAction.pending, (state) => {
        state.createModal.loading = "loading";
      })
      .addCase(createScheduleAction.fulfilled, (state) => {
        state.createModal.loading = "idle";
        state.createModal.isShown = false;
        toast.success(
          i18n.t("app.pages.StudySchedule.orgStructure.schedule.notifyCreated"),
        );
      })
      .addCase(createScheduleAction.rejected, (state) => {
        state.createModal.loading = "error";

        toast.error(
          i18n.t(
            "app.pages.StudySchedule.orgStructure.schedule.notifyCreateFailed",
          ),
        );
      });

    builder
      .addCase(editScheduleAction.pending, (state) => {
        state.editModal.loading = "loading";
      })
      .addCase(
        editScheduleAction.fulfilled,
        (state, { payload: scheduleItem }) => {
          state.editModal.loading = "idle";
          state.editModal.isShown = false;

          state.list = state.list.map((item) => {
            if (item.id === scheduleItem.id) {
              scheduleItem.executionDate = item.executionDate;
              return scheduleItem;
            }

            return item;
          });

          toast.success(
            i18n.t(
              "app.pages.StudySchedule.orgStructure.schedule.notifyEdited",
            ),
          );
        },
      )
      .addCase(editScheduleAction.rejected, (state) => {
        state.editModal.loading = "error";

        toast.error(
          i18n.t(
            "app.pages.StudySchedule.orgStructure.schedule.notifyEditFailed",
          ),
        );
      });
  },
});
