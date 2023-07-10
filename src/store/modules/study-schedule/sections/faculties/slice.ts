import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "i18next";
import { toast } from "react-toastify";
import { clearDuplicateItemsById } from "@store/helpers";
import {
  createDepartmentAction,
  createFacultyAction,
  deleteDepartmentAction,
  deleteFacultyAction,
  editDepartmentAction,
  editFaculty,
  loadFacultiesAction,
} from "@store/modules/study-schedule/sections/faculties/actions";
import {
  IFacultyStore,
  TDepartmentModalActionPayload,
  TFacultyModalActionPayload,
} from "@domain/entity/study-schedule";

const initialState: IFacultyStore = {
  createFacultyModal: {},
  editFacultyModal: {},
  createDepartmentModal: {},
  editDepartmentModal: {},

  searchValue: "",

  loading: "loading",
  faculties: [],
};

export const facultySlice = createSlice({
  name: "StudySchedule/faculty",
  initialState,
  reducers: {
    setSearchValue(state, { payload }: PayloadAction<string>): void {
      state.searchValue = payload;
    },
    setCreateDepartmentModalShown(
      state,
      { payload }: PayloadAction<TDepartmentModalActionPayload>,
    ) {
      state.createDepartmentModal.facultyId = payload.facultyId;
      state.createDepartmentModal.isShown = payload.status;
    },
    setEditDepartmentModalShown(
      state,
      { payload }: PayloadAction<TDepartmentModalActionPayload>,
    ) {
      state.editDepartmentModal.itemId = payload.itemId;
      state.editDepartmentModal.facultyId = payload.facultyId;
      state.editDepartmentModal.isShown = payload.status;
    },
    setCreateFacultyModalShown(
      state,
      { payload }: PayloadAction<TFacultyModalActionPayload>,
    ) {
      state.createFacultyModal.isShown = payload.status;
    },
    setEditFacultyModalShown(
      state,
      { payload }: PayloadAction<TFacultyModalActionPayload>,
    ) {
      state.editFacultyModal.itemId = payload.itemId;
      state.editFacultyModal.isShown = payload.status;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadFacultiesAction.pending, (state, { meta }) => {
        if (meta.arg.page === 1 || !state.faculties.length) {
          state.faculties = [];
          state.loading = "loading";
          return;
        }

        state.loading = "still-loading";
      })
      .addCase(loadFacultiesAction.fulfilled, (state, { payload }) => {
        state.pagination = payload;
        state.faculties = clearDuplicateItemsById([
          ...state.faculties,
          ...payload.data,
        ]);
        state.loading = "idle";
      })
      .addCase(loadFacultiesAction.rejected, (state) => {
        state.loading = "error";
        toast.error(i18n.t("app.request.failedLoad"));
      });

    builder
      .addCase(
        deleteFacultyAction.fulfilled,
        (state, { payload: facultyId }) => {
          state.faculties = state.faculties.filter(
            (item) => item.id !== facultyId,
          );
        },
      )
      .addCase(deleteFacultyAction.rejected, () => {
        toast.error(i18n.t("app.request.failedDelete"));
      });

    builder
      .addCase(
        deleteDepartmentAction.fulfilled,
        (state, { payload: departmentId }) => {
          state.faculties = state.faculties.map((item) => {
            item.departments = item.departments.filter(
              (department) => department.id !== departmentId,
            );

            return item;
          });

          toast.success(
            i18n.t(
              "app.pages.StudySchedule.orgStructure.faculties.departmentDeleted",
            ),
          );
        },
      )
      .addCase(deleteDepartmentAction.rejected, () => {
        toast.error(i18n.t("app.request.failedDelete"));
      });

    builder
      .addCase(createFacultyAction.pending, (state) => {
        state.createFacultyModal.loading = "loading";
      })
      .addCase(createFacultyAction.fulfilled, (state, { payload }) => {
        state.faculties = [
          ...state.faculties,
          {
            ...payload,
            departments: [],
          },
        ];

        state.createFacultyModal.isShown = false;
        state.createFacultyModal.loading = "idle";

        toast.success(
          i18n.t("app.pages.StudySchedule.orgStructure.faculties.dataUpdated"),
        );
      })
      .addCase(createFacultyAction.rejected, (state) => {
        state.createFacultyModal.loading = "error";
      });

    builder
      .addCase(editFaculty.pending, (state) => {
        state.editFacultyModal.loading = "loading";
      })
      .addCase(editFaculty.fulfilled, (state, { payload }) => {
        state.faculties = state.faculties.map((item) => {
          if (item.id === payload.id) {
            return {
              ...item,
              name: payload.name,
            };
          }

          return item;
        });

        state.editFacultyModal.isShown = false;
        state.editFacultyModal.loading = "idle";

        toast.success(
          i18n.t("app.pages.StudySchedule.orgStructure.faculties.dataUpdated"),
        );
      })
      .addCase(editFaculty.rejected, (state) => {
        state.editFacultyModal.loading = "error";
      });

    builder
      .addCase(createDepartmentAction.pending, (state) => {
        state.createDepartmentModal.loading = "loading";
      })
      .addCase(createDepartmentAction.fulfilled, (state, { payload }) => {
        state.createDepartmentModal.isShown = false;
        state.createDepartmentModal.loading = "idle";

        state.faculties = state.faculties.map((item) => {
          if (item.id === payload.faculty_id) {
            item.departments = [...item.departments, payload];

            return item;
          }

          return item;
        });

        toast.success(
          i18n.t("app.pages.StudySchedule.orgStructure.faculties.dataUpdated"),
        );
      })
      .addCase(createDepartmentAction.rejected, (state) => {
        state.createDepartmentModal.loading = "error";
      });

    builder
      .addCase(editDepartmentAction.pending, (state) => {
        state.editDepartmentModal.loading = "loading";
      })
      .addCase(editDepartmentAction.fulfilled, (state, { payload }) => {
        state.faculties = state.faculties.map((item) => {
          if (item.id === payload.faculty_id) {
            item.departments = item.departments.map((department) => {
              if (department.id === payload.id) {
                return payload;
              }

              return department;
            });

            return item;
          }

          return item;
        });

        state.editDepartmentModal.isShown = false;
        state.editDepartmentModal.loading = "idle";

        toast.success(
          i18n.t("app.pages.StudySchedule.orgStructure.faculties.dataUpdated"),
        );
      })
      .addCase(editDepartmentAction.rejected, (state) => {
        state.editDepartmentModal.loading = "error";
      });
  },
});
