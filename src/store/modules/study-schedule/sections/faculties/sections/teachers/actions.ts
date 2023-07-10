import { createAsyncThunk } from "@reduxjs/toolkit";
import { appSlice } from "@store/modules/app/slice";
import { selectSectionParentId } from "@store/modules/study-schedule/sections/faculties/sections/department/selector";
import { RootState } from "@store/rootReducer";
import { TPaginationBase } from "@domain/app";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";
import {
  ITeacherEntity,
  TLoadTeachersParams,
  TTeacherEdit,
  TTeacherNew,
} from "@domain/entity/study-schedule/index";

export const loadTeachersAction = createAsyncThunk<
  TPaginationBase<ITeacherEntity[]>,
  TLoadTeachersParams,
  {
    state: RootState;
  }
>("teachers/loadTeachersAction", async (params, { getState }) => {
  const parentId = selectSectionParentId(getState());

  return await StudyScheduleApi.teacher.getTeachers({
    ...params,
    parentId,
  });
});

export const createTeacherAction = createAsyncThunk<
  ITeacherEntity,
  TTeacherNew,
  {
    state: RootState;
  }
>("teachers/createTeacherAction", async (teacher, { getState, dispatch }) => {
  const parentId = selectSectionParentId(getState());
  dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    return await StudyScheduleApi.teacher.addTeacher({
      ...teacher,
      position: teacher.position?.length ? teacher.position : undefined,
      parentId,
    });
  } catch (error) {
    return Promise.reject();
  } finally {
    dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const editTeacherAction = createAsyncThunk<
  ITeacherEntity,
  TTeacherEdit,
  {
    state: RootState;
  }
>("teachers/editTeacherAction", async (teacher, { dispatch, getState }) => {
  const parentId = selectSectionParentId(getState());
  dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    return await StudyScheduleApi.teacher.editTeacher({
      ...teacher,
      position: teacher.position?.length ? teacher.position : undefined,
      parentId,
    });
  } catch (error) {
    return Promise.reject();
  } finally {
    dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const deleteTeacherAction = createAsyncThunk<Id, Id>(
  "teachers/deleteTeacherAction",
  async (teacherId: Id, { dispatch }) => {
    dispatch(appSlice.actions.setActionLoaderStatus(true));

    try {
      await StudyScheduleApi.teacher.deleteTeacher(teacherId);

      return teacherId;
    } catch (error) {
      return Promise.reject();
    } finally {
      dispatch(appSlice.actions.setActionLoaderStatus(false));
    }
  },
);
