import { createAsyncThunk } from "@reduxjs/toolkit";
import { appSlice } from "@store/modules/index";
import { selectSectionParentId } from "@store/modules/study-schedule/sections/faculties/sections/department/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { RootState } from "@store/rootReducer";
import { TPaginationBase } from "@domain/app";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";
import {
  EStudyScheduleTypes,
  IGroupEntity,
  TGroupInputs,
  TLoadGroupParams,
} from "@domain/entity/study-schedule/index";

export const loadGroupAction = createAsyncThunk<
  {
    result: TPaginationBase<IGroupEntity[]>;
    departmentId?: Id;
  },
  TLoadGroupParams,
  {
    state: RootState;
  }
>("group/loadGroupAction", async (params, thunkAPI) => {
  const { type } = selectStudySchedule(thunkAPI.getState());
  const parentId = selectSectionParentId(thunkAPI.getState());
  const isUniversity = type === EStudyScheduleTypes.UNIVERSITY;

  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    const result = await StudyScheduleApi.group.getGroups({
      ...params,
      parentId,
    });

    result.data = result.data.map((item) => ({
      ...item,
      department_id: isUniversity ? parentId : null,
    }));

    return {
      result,
      parentId,
    };
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const createGroupAction = createAsyncThunk<
  IGroupEntity,
  TGroupInputs,
  {
    state: RootState;
  }
>("group/createGroupAction", async (newGroup, thunkAPI) => {
  const parentId = selectSectionParentId(thunkAPI.getState());
  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    return await StudyScheduleApi.group.createGroup(newGroup, parentId);
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const editGroupAction = createAsyncThunk<
  IGroupEntity,
  IGroupEntity,
  {
    state: RootState;
  }
>("group/editGroupAction", async (group, thunkAPI) => {
  const parentId = selectSectionParentId(thunkAPI.getState());
  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    return await StudyScheduleApi.group.editGroup(group, parentId);
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const deleteGroupAction = createAsyncThunk<Id, Id>(
  "group/deleteGroupAction",
  async (groupId, thunkAPI) => {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

    try {
      await StudyScheduleApi.group.deleteGroup(groupId);

      return groupId;
    } catch (error) {
      return Promise.reject();
    } finally {
      thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
    }
  },
);
