import { createAsyncThunk } from "@reduxjs/toolkit";
import i18n from "i18next";
import { toast } from "react-toastify";
import { appSlice } from "@store/modules";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { RootState } from "@store/rootReducer";
import { TPaginationBase, TPaginationParams } from "@domain/app";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";
import {
  IDepartmentEntity,
  IFacultyEntity,
  TDepartmentNew,
  TFacultyEdit,
  TFacultyNew,
} from "@domain/entity/study-schedule/index";

export const loadFacultiesAction = createAsyncThunk<
  TPaginationBase<IFacultyEntity[]>,
  TPaginationParams,
  {
    state: RootState;
  }
>("faculty/loadFacultiesAction", async (params, thunkAPI) => {
  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    return await StudyScheduleApi.faculty.getFaculties(params);
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const deleteFacultyAction = createAsyncThunk<
  Id,
  Id,
  { state: RootState }
>("faculty/deleteFacultyAction", async (facultyId: Id, thunkAPI) => {
  const { type: moduleType } = selectStudySchedule(thunkAPI.getState());

  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    await StudyScheduleApi.faculty.deleteFaculty(facultyId);

    toast.success(
      i18n.t(
        `app.pages.StudySchedule.orgStructure.faculties.facultyDeleted.${moduleType}`,
      ),
    );

    return facultyId;
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const createFacultyAction = createAsyncThunk<
  IFacultyEntity,
  TFacultyNew,
  {
    state: RootState;
  }
>("faculty/createFacultyAction", async (action, thunkAPI) => {
  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    return await StudyScheduleApi.faculty.createFaculty(action.name);
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const editFaculty = createAsyncThunk<IFacultyEntity, TFacultyEdit>(
  "faculty/editFaculty",
  async (action, thunkAPI) => {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

    try {
      return await StudyScheduleApi.faculty.editFaculty(action.id, action.name);
    } catch (error) {
      return Promise.reject();
    } finally {
      thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
    }
  },
);

export const createDepartmentAction = createAsyncThunk<
  IDepartmentEntity,
  TDepartmentNew
>("faculty/createDepartmentAction", async (departmentItem, thunkAPI) => {
  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    return await StudyScheduleApi.faculty.createDepartment(
      departmentItem.faculty_id,
      departmentItem.name,
    );
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const editDepartmentAction = createAsyncThunk<
  IDepartmentEntity,
  IDepartmentEntity
>("faculty/editDepartmentAction", async (departmentItem, thunkAPI) => {
  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    return await StudyScheduleApi.faculty.editDepartment(
      departmentItem.faculty_id,
      departmentItem.id,
      departmentItem.name,
    );
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const deleteDepartmentAction = createAsyncThunk<Id, Id>(
  "faculty/deleteDepartmentAction",
  async (departmentId, thunkAPI) => {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

    try {
      await StudyScheduleApi.faculty.deleteDepartment(departmentId);

      return departmentId;
    } catch (error) {
      return Promise.reject();
    } finally {
      thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
    }
  },
);
