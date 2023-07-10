import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "i18next";
import { toast } from "react-toastify";
import { clearDuplicateItemsById } from "@store/helpers";
import {
  createGroupAction,
  deleteGroupAction,
  editGroupAction,
  loadGroupAction,
} from "@store/modules/study-schedule/sections/faculties/sections/group/actions";
import { IGroupStore, TGroupFilter } from "@domain/entity/study-schedule/index";

const initialState: IGroupStore = {
  filters: [],
  list: [],
  loading: "loading",

  departmentId: null,
  searchValue: "",

  createModal: {},
  editModal: {},
};

export const groupSlice = createSlice({
  name: "studySchedule/groupSlice",
  initialState,
  reducers: {
    setSearchValue(state, { payload }: PayloadAction<string>) {
      state.searchValue = payload;
    },
    setFilter(state, { payload }: PayloadAction<TGroupFilter>) {
      if (
        state.filters.find(
          (item) => item.value.fieldName === payload.value.fieldName,
        )
      ) {
        state.filters = state.filters.filter(
          (item) => item.value.fieldName !== payload.value.fieldName,
        );
      }

      if (payload.value.substring !== null) {
        state.filters = [...state.filters, payload];
      }
    },
    setCreateGroupFormShown(state, { payload }: PayloadAction<boolean>) {
      state.createModal.isShown = payload;
    },
    setEditGroupFormShown(
      state,
      {
        payload,
      }: PayloadAction<{
        status: boolean;
        itemId: Id;
      }>,
    ) {
      state.editModal.isShown = payload.status;
      state.editModal.itemId = payload.itemId;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadGroupAction.pending, (state, { meta }) => {
        if (meta.arg.page === 1 || !state.list.length) {
          state.list = [];
          state.loading = "loading";

          return;
        }

        state.loading = "still-loading";
      })
      .addCase(loadGroupAction.fulfilled, (state, { payload }) => {
        state.pagination = payload.result;

        if (payload.departmentId) {
          state.departmentId = payload.departmentId;
        }

        state.list = clearDuplicateItemsById([
          ...state.list,
          ...payload.result.data,
        ]);
        state.loading = "idle";
      })
      .addCase(loadGroupAction.rejected, (state) => {
        state.loading = "error";
        toast.error(i18n.t("app.request.failedLoad"));
      });

    builder
      .addCase(createGroupAction.pending, (state) => {
        state.createModal.loading = "loading";
      })
      .addCase(
        createGroupAction.fulfilled,
        (state, { payload: newGroupItem }) => {
          state.createModal.loading = "idle";
          state.createModal.isShown = false;

          if (state.departmentId != newGroupItem.department_id) {
            toast.success(
              i18n.t("app.pages.StudySchedule.orgStructure.group.notifyAdded"),
            );

            return;
          }

          state.list = [...state.list, newGroupItem];

          toast.success(
            i18n.t("app.pages.StudySchedule.orgStructure.group.notifyAdded"),
          );
        },
      )
      .addCase(createGroupAction.rejected, (state) => {
        state.createModal.loading = "error";

        toast.error(
          i18n.t(
            "app.pages.StudySchedule.orgStructure.group.notifyFailedToAdd",
          ),
        );
      });

    builder
      .addCase(editGroupAction.pending, (state) => {
        state.editModal.loading = "loading";
      })
      .addCase(
        editGroupAction.fulfilled,
        (state, { payload: updatedGroupItem }) => {
          state.editModal.loading = "idle";
          state.editModal.isShown = false;

          const groupItemIndex = state.list.findIndex(
            (item) => item.id === updatedGroupItem.id,
          );

          if (groupItemIndex === -1) {
            toast.error(
              i18n.t(
                "app.pages.StudySchedule.orgStructure.group.notifyFailedToEdit",
              ),
            );

            return;
          }

          const groupItem = state.list[groupItemIndex];

          if (groupItem.department_id !== updatedGroupItem.department_id) {
            state.list = state.list.filter(
              (item) => item.id !== updatedGroupItem.id,
            );

            return;
          }

          state.list[groupItemIndex] = updatedGroupItem;

          toast.success(
            i18n.t("app.pages.StudySchedule.orgStructure.group.notifyEdited"),
          );
        },
      )
      .addCase(editGroupAction.rejected, (state) => {
        state.editModal.loading = "error";

        toast.error(
          i18n.t(
            "app.pages.StudySchedule.orgStructure.group.notifyFailedToEdit",
          ),
        );
      });

    builder
      .addCase(deleteGroupAction.fulfilled, (state, { payload: groupId }) => {
        state.list = state.list.filter((item) => item.id !== groupId);

        toast.success(
          i18n.t("app.pages.StudySchedule.orgStructure.group.notifyDeleted"),
        );
      })
      .addCase(deleteGroupAction.rejected, () => {
        toast.error(
          i18n.t(
            "app.pages.StudySchedule.orgStructure.group.notifyFailedToDelete",
          ),
        );
      });
  },
});
