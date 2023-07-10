import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "i18next";
import { toast } from "react-toastify";
import { clearDuplicateItemsById } from "@store/helpers";
import {
  createBuildingAction,
  deleteBuildingAction,
  editBuildingAction,
  loadBuildingAction,
} from "@store/modules/study-schedule/sections/building/actions";
import { IBuildingStore } from "@domain/entity/study-schedule";
import { TEditActionPayload } from "@domain/store";

const initialState: IBuildingStore = {
  list: [],
  error: null,
  loading: "loading",

  searchValue: "",

  createModal: {},
  editModal: {},
};

export const buildingSlice = createSlice({
  name: "StudySchedule/Building",
  initialState,
  reducers: {
    setBuildingCreateModalStatus(state, { payload }: PayloadAction<boolean>) {
      state.createModal.isShown = payload;
    },
    setBuildingEditModalStatus(
      state,
      { payload }: PayloadAction<TEditActionPayload>,
    ) {
      state.editModal.isShown = payload.status;
      state.editModal.itemId = payload.itemId;
    },
    setSearchValue(state, { payload }: PayloadAction<string>) {
      state.searchValue = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadBuildingAction.pending, (state, { meta }) => {
        if (meta.arg.page === 1 || !state.list.length) {
          state.list = [];
          state.loading = "loading";
          return;
        }

        state.loading = "still-loading";
      })
      .addCase(
        loadBuildingAction.fulfilled,
        (state, { payload: buildings }) => {
          state.pagination = buildings;
          state.list = clearDuplicateItemsById([
            ...state.list,
            ...buildings.data,
          ]);
          state.loading = "idle";
        },
      )
      .addCase(loadBuildingAction.rejected, (state) => {
        state.loading = "error";
      });

    builder
      .addCase(createBuildingAction.pending, (state) => {
        state.createModal.loading = "loading";
      })
      .addCase(
        createBuildingAction.fulfilled,
        (state, { payload: buildingItem }) => {
          state.createModal.loading = "idle";
          state.createModal.isShown = false;
          state.list = [...state.list, buildingItem];

          toast.success(
            i18n.t("app.store.study-schedule.building.successAddToast"),
          );
        },
      )
      .addCase(createBuildingAction.rejected, (state) => {
        state.createModal.loading = "error";
        toast.error(i18n.t("app.store.study-schedule.building.errorAddToast"));
      });

    builder
      .addCase(editBuildingAction.pending, (state) => {
        state.editModal.loading = "loading";
      })
      .addCase(
        editBuildingAction.fulfilled,
        (state, { payload: buildingItem }) => {
          state.editModal.loading = "idle";
          state.editModal.isShown = false;

          state.list = state.list.map((item) => {
            if (item.id === buildingItem.id) {
              item = {
                ...item,
                ...buildingItem,
              };
            }

            return item;
          });

          toast.success(
            i18n.t("app.store.study-schedule.building.successEditToast"),
          );
        },
      )
      .addCase(editBuildingAction.rejected, (state) => {
        state.editModal.loading = "error";
        i18n.t("app.store.study-schedule.building.errorAddToast");
      });

    builder
      .addCase(
        deleteBuildingAction.fulfilled,
        (state, { payload: buildingId }) => {
          state.list = state.list.filter(
            (buildingItem) => buildingItem.id !== buildingId,
          );

          toast.success(
            i18n.t("app.features.study-schedule.building.buildingRemovedToast"),
          );
        },
      )
      .addCase(deleteBuildingAction.rejected, () => {
        toast.error(i18n.t("app.request.failedDelete"));
      });
  },
});
