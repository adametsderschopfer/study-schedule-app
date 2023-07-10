import { createAsyncThunk } from "@reduxjs/toolkit";
import i18n from "i18next";
import { toast } from "react-toastify";
import { appSlice } from "@store/modules/index";
import { selectDetailDepartmentInfo } from "@store/modules/study-schedule/sections/faculties/sections/department/selector";
import { selectGroupSchedule } from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { RootState } from "@store/rootReducer";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";
import {
  EStudyScheduleTypes,
  IGroupEntity,
  IScheduleApiResult,
  IScheduleEntity,
  IScheduleItem,
  TLoadSchedulesParams,
  TScheduleInputs,
} from "@domain/entity/study-schedule/index";

export const updateDetailGroupInfoAction = createAsyncThunk<IGroupEntity, Id>(
  "schedule/updateDetailGroupInfoAction",
  async (groupId) => {
    return await StudyScheduleApi.group.getGroupById(groupId);
  },
);

export const loadSchedulesAction = createAsyncThunk<
  IScheduleApiResult,
  TLoadSchedulesParams,
  {
    state: RootState;
  }
>("schedule/loadSchedulesAction", async (params, thunkAPI) => {
  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    return await StudyScheduleApi.schedule.getSchedules(params);
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const createScheduleAction = createAsyncThunk<
  IScheduleItem,
  TScheduleInputs,
  {
    state: RootState;
  }
>("schedule/createScheduleAction", async (schedule, thunkAPI) => {
  const state = thunkAPI.getState();
  const studySchedule = selectStudySchedule(state);
  const groupSchedule = selectGroupSchedule(state);
  const departmentInfo = selectDetailDepartmentInfo(state);

  if (
    studySchedule.type === EStudyScheduleTypes.UNIVERSITY &&
    !departmentInfo
  ) {
    return Promise.reject();
  }

  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    return await StudyScheduleApi.schedule.createSchedule({
      ...schedule,
      group_id: groupSchedule.detailGroup.id,
      department_id: departmentInfo?.department?.id,
    });
  } catch (error) {
    console.error(error);
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const editScheduleAction = createAsyncThunk<
  IScheduleItem,
  IScheduleEntity
>("schedule/editScheduleAction", async (schedule, thunkAPI) => {
  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  if (schedule.department_id === null) {
    (schedule.department_id as unknown as undefined) = undefined;
  }

  try {
    return await StudyScheduleApi.schedule.editSchedule(schedule);
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const deleteScheduleAction = createAsyncThunk<Id, Id>(
  "schedule/deleteScheduleAction",
  async (scheduleId, thunkAPI) => {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

    try {
      await StudyScheduleApi.schedule.deleteSchedule(scheduleId);

      return scheduleId;
    } catch (error) {
      return Promise.reject();
    } finally {
      thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
    }
  },
);

export const duplicateScheduleAction = createAsyncThunk<
  undefined,
  Id,
  {
    state: RootState;
  }
>(
  "schedule/duplicateScheduleAction",
  async (id, thunkAPI) => {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));
    const groupSchedule = selectGroupSchedule(thunkAPI.getState());
    const currentSchedule = groupSchedule.list.find(
      (schedule) => schedule.id === id,
    );

    if (!currentSchedule) {
      toast.error(i18n.t("app.errors.DUPLICATE_FAILED"));
      return Promise.reject();
    }

    const duplicatedScheduleItem = {
      building_classroom_id: currentSchedule.building_classroom_id,
      building_id: currentSchedule.building_id,
      day_of_week: currentSchedule.day_of_week,
      department_id: currentSchedule.department_id,
      group_id: currentSchedule.group_id,
      repeat_end: currentSchedule.repeat_end,
      repeat_start: currentSchedule.repeat_start,
      repeatability: currentSchedule.repeatability,
      schedule_setting_id: currentSchedule.schedule_setting_id,
      schedule_setting_item_order: currentSchedule.schedule_setting_item_order,
      sub_group: currentSchedule.sub_group,
      subject_id: currentSchedule.subject_id,
      teacher_id: currentSchedule.teacher_id,
      type: currentSchedule.type,
    } as IScheduleEntity;

    try {
      await thunkAPI.dispatch(createScheduleAction(duplicatedScheduleItem));
      return;
    } catch (error) {
      toast.error(i18n.t("app.errors.DUPLICATE_FAILED"));

      console.error(error);
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
    }
  },
  {},
);
