import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "i18next";
import { toast } from "react-toastify";
import { clearDuplicateItemsById } from "@store/helpers";
import {
  createTeacherAction,
  deleteTeacherAction,
  editTeacherAction,
  loadTeachersAction,
} from "@store/modules/study-schedule/sections/faculties/sections/teachers/actions";
import { ITeacherStore } from "@domain/entity/study-schedule/index";

const initialState: ITeacherStore = {
  currentSortType: {
    fieldName: "full_name",
    order: "asc",
  },
  loading: "loading",
  list: [],

  searchValue: "",

  createModal: {},
  editModal: {},
};

export const teachersSlice = createSlice({
  name: "studySchedule/teachersSlice",
  initialState,
  reducers: {
    changeSortType(state, { payload }) {
      state.currentSortType = payload;
    },
    setSearchValue(state, { payload }) {
      state.searchValue = payload;
    },

    setCreateTeacherFormShown(state, { payload }: PayloadAction<boolean>) {
      state.createModal.isShown = payload;
    },
    setEditTeacherFormShown(
      state,
      { payload }: PayloadAction<{ status: boolean; itemId: Id }>,
    ) {
      state.editModal.itemId = payload.itemId;
      state.editModal.isShown = payload.status;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadTeachersAction.pending, (state, { meta }) => {
        if (meta.arg.page === 1 || !state.list.length) {
          state.list = [];
          state.loading = "loading";
          return;
        }

        state.loading = "still-loading";
      })
      .addCase(loadTeachersAction.fulfilled, (state, { payload }) => {
        state.pagination = payload;
        state.loading = "idle";
        state.list = clearDuplicateItemsById([...state.list, ...payload.data]);
      })
      .addCase(loadTeachersAction.rejected, (state) => {
        state.loading = "error";
        toast.error(i18n.t("app.request.failedLoad"));
      });

    builder
      .addCase(
        deleteTeacherAction.fulfilled,
        (state, { payload: teacherId }) => {
          state.list = state.list.filter((teacher) => teacher.id !== teacherId);

          toast.success(
            i18n.t(
              "app.pages.StudySchedule.orgStructure.teachers.teacherRemoved",
            ),
          );
        },
      )
      .addCase(deleteTeacherAction.rejected, () => {
        toast.error(i18n.t("app.request.failedDelete"));
      });

    builder
      .addCase(createTeacherAction.pending, (state) => {
        state.createModal.loading = "loading";
      })
      .addCase(createTeacherAction.fulfilled, (state, { payload }) => {
        state.createModal.loading = "idle";
        state.createModal.isShown = false;

        state.list = [...state.list, payload];

        toast.success(
          i18n.t(
            "app.pages.StudySchedule.orgStructure.teachers.toastTeacherAdded",
          ),
        );
      })
      .addCase(createTeacherAction.rejected, (state) => {
        state.createModal.loading = "error";

        toast.error(
          i18n.t(
            "app.pages.StudySchedule.orgStructure.teachers.toastTeacherFailedUpdate",
          ),
        );
      });

    builder
      .addCase(editTeacherAction.pending, (state) => {
        state.editModal.loading = "loading";
      })
      .addCase(editTeacherAction.fulfilled, (state, { payload }) => {
        state.editModal.loading = "idle";
        state.editModal.isShown = false;

        state.list = state.list.map((item) => {
          if (item.id === payload.id) {
            return payload;
          }

          return item;
        });

        toast.success(
          i18n.t(
            "app.pages.StudySchedule.orgStructure.teachers.toastTeacherEdited",
          ),
        );
      })
      .addCase(editTeacherAction.rejected, (state) => {
        state.editModal.loading = "error";

        toast.error(
          i18n.t(
            "app.pages.StudySchedule.orgStructure.teachers.toastTeacherFailedUpdate",
          ),
        );
      });
  },
});
