import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "i18next";
import { toast } from "react-toastify";
import { clearDuplicateItemsById } from "@store/helpers";
import {
  createSubjectAction,
  deleteSubjectAction,
  editSubjectAction,
  loadSubjectAction,
} from "@store/modules/study-schedule/sections/faculties/sections/subject/actions";
import { ISubjectStore } from "@domain/entity/study-schedule/index";

export const initialState: ISubjectStore = {
  loading: "loading",
  list: [],

  searchValue: "",

  createModal: {},
  editModal: {},
};

type TSetShownParams = {
  status: boolean;
  facultyId?: Id;
  departmentId?: Id;
};

export const subjectSlice = createSlice({
  name: "studySchedule/subjectSlice",
  initialState,
  reducers: {
    setSearchValue(state, { payload }: PayloadAction<string>) {
      state.searchValue = payload;
    },
    setCreateSubjectModalShown(
      state,
      { payload }: PayloadAction<TSetShownParams>,
    ) {
      state.createModal.isShown = payload.status;
      state.createModal.facultyId = payload.facultyId;
      state.createModal.departmentId = payload.departmentId;
    },
    setEditSubjectModalShown(
      state,
      { payload }: PayloadAction<TSetShownParams & { itemId: Id }>,
    ) {
      state.editModal.isShown = payload.status;
      state.editModal.itemId = payload.itemId;
      state.editModal.facultyId = payload.facultyId;
      state.editModal.departmentId = payload.departmentId;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadSubjectAction.pending, (state, { meta }) => {
        if (meta.arg.page === 1 || !state.list.length) {
          state.list = [];
          state.loading = "loading";
          return;
        }

        state.loading = "still-loading";
      })
      .addCase(loadSubjectAction.fulfilled, (state, { payload: subject }) => {
        state.pagination = subject;
        state.loading = "idle";
        state.list = clearDuplicateItemsById([...state.list, ...subject.data]);
      })
      .addCase(loadSubjectAction.rejected, (state) => {
        state.loading = "error";
        toast.error(i18n.t("app.request.failedLoad"));
      });

    builder
      .addCase(createSubjectAction.pending, (state) => {
        state.createModal.loading = "loading";
      })
      .addCase(createSubjectAction.fulfilled, (state, { payload }) => {
        state.createModal.loading = "idle";
        state.createModal.isShown = false;

        state.list = [...state.list, payload];

        toast.success(
          i18n.t(
            "app.pages.StudySchedule.orgStructure.subject.toastSubjectAdded",
          ),
        );
      })
      .addCase(createSubjectAction.rejected, (state) => {
        state.createModal.loading = "error";
        toast.error(
          i18n.t(
            "app.pages.StudySchedule.orgStructure.subject.toastSubjectFailedAdd",
          ),
        );
      });

    builder
      .addCase(editSubjectAction.pending, (state) => {
        state.editModal.loading = "loading";
      })
      .addCase(editSubjectAction.fulfilled, (state, { payload }) => {
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
            "app.pages.StudySchedule.orgStructure.subject.toastSubjectEdited",
          ),
        );
      })
      .addCase(editSubjectAction.rejected, (state) => {
        state.editModal.loading = "error";
        toast.error(
          i18n.t(
            "app.pages.StudySchedule.orgStructure.subject.toastSubjectFailedEdit",
          ),
        );
      });

    builder
      .addCase(deleteSubjectAction.fulfilled, (state, { payload }) => {
        state.list = state.list.filter((item) => item.id !== payload.id);

        toast.success(
          i18n.t(
            "app.pages.StudySchedule.orgStructure.subject.toastSubjectDeleted",
          ),
        );
      })
      .addCase(deleteSubjectAction.rejected, () => {
        toast.error(
          i18n.t(
            "app.pages.StudySchedule.orgStructure.subject.toastSubjectFailedDelete",
          ),
        );
      });
  },
});
