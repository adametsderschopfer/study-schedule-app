import { createAsyncThunk } from "@reduxjs/toolkit";
import { appSlice } from "@store/modules/index";
import { selectSectionParentId } from "@store/modules/study-schedule/sections/faculties/sections/department/selector";
import { RootState } from "@store/rootReducer";
import { TPaginationBase } from "@domain/app";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";
import {
  ISubjectEntity,
  TLoadSubjectParams,
  TSubjectNew,
} from "@domain/entity/study-schedule/index";

export const loadSubjectAction = createAsyncThunk<
  TPaginationBase<ISubjectEntity[]>,
  TLoadSubjectParams,
  {
    state: RootState;
  }
>("subject/loadSubjectAction", async (params, thunkAPI) => {
  const parentId = selectSectionParentId(thunkAPI.getState());
  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    return await StudyScheduleApi.subject.getSubjects({
      ...params,
      parentId,
    });
  } catch (error) {
    console.log(error);
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const createSubjectAction = createAsyncThunk<
  ISubjectEntity,
  TSubjectNew & { isAddInAllDepartments: boolean },
  { state: RootState }
>("subject/createSubjectAction", async (subject, thunkAPI) => {
  const parentId = selectSectionParentId(thunkAPI.getState());
  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    return await StudyScheduleApi.subject.createSubject(subject, parentId);
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const editSubjectAction = createAsyncThunk<
  ISubjectEntity,
  ISubjectEntity,
  {
    state: RootState;
  }
>("subject/editSubjectAction", async (subject, thunkAPI) => {
  const parentId = selectSectionParentId(thunkAPI.getState());
  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    return StudyScheduleApi.subject.editSubject(subject, parentId);
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const deleteSubjectAction = createAsyncThunk<
  ISubjectEntity,
  ISubjectEntity
>("subject/deleteSubjectAction", async (action, thunkAPI) => {
  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    await StudyScheduleApi.subject.deleteSubject(action.id);
    return action;
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});
