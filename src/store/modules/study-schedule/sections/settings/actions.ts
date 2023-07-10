import { createAsyncThunk } from "@reduxjs/toolkit";
import { validateHhMm } from "@utils/validators/validateHhMm";
import i18n from "i18next";
import { toast } from "react-toastify";
import { appSlice } from "@store/modules/index";
import {
  selectStudyScheduleSettings,
  selectStudyScheduleSettingsCurrentMode,
} from "@store/modules/study-schedule/sections/settings/selector";
import { RootState } from "@store/rootReducer";
import { TPaginationBase, TPaginationParams } from "@domain/app";
import {
  TModeCreateAction,
  TSettingsMode,
  TSettingsRenameModeAction,
} from "@domain/entity/study-schedule";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";

export const onPageStartAction = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("settings/onPageStartAction", async (_, { dispatch, getState }) => {
  const settings = selectStudyScheduleSettings(getState());

  if (!settings.isProcessBusy) {
    try {
      await dispatch(
        loadSettingsModesAction({
          page: 1,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }
});

export const loadSettingsModesAction = createAsyncThunk<
  TPaginationBase<TSettingsMode[]>,
  TPaginationParams
>("settings/loadSettingsModesAction", async (params) => {
  return await StudyScheduleApi.settings.getModes(params);
});

export const deleteModeLessonAction = createAsyncThunk(
  "settings/deleteModeLessonAction",
  async ({ lessonIndex, modeId }: Record<any, any>, thunkAPI) => {
    const store = thunkAPI.getState() as RootState;
    const currentMode = store.modules.studySchedule.settings.modes.find(
      (item) => item.id === modeId,
    );

    if (!currentMode) {
      return Promise.reject();
    }

    const lessons = currentMode.lessons.filter(
      (_: unknown, index: number) => index !== lessonIndex,
    );

    const response = await StudyScheduleApi.settings.updateMode({
      ...currentMode,
      schedule_setting_items: lessons,
    });

    return thunkAPI.fulfillWithValue({ lessons, response: response });
  },
);

export const modeLessonTimeChangeFinishAction = createAsyncThunk<
  any,
  { lessonIndex: number },
  { state: RootState }
>(
  "Settings/modeLessonTimeChangeFinishAction",
  async ({ lessonIndex }, thunkAPI) => {
    const settings = selectStudyScheduleSettings(thunkAPI.getState());
    const currentMode = selectStudyScheduleSettingsCurrentMode(
      thunkAPI.getState(),
    );

    if (!currentMode) {
      return Promise.reject();
    }

    const currentLesson = currentMode.lessons.find(
      (_: unknown, index: number) => index === lessonIndex,
    );

    if (!settings.currentModeId || !currentLesson) {
      toast.error(
        i18n.t("app.store.study-schedule.settings.changeTime.requestError"),
      );

      return Promise.reject();
    }

    const isCurrentLessonStartEmpty = currentLesson.time_end === "00:00";
    const isCurrentLessonEndEmpty = currentLesson.time_end === "00:00";

    if (!currentLesson.isChanged) {
      return thunkAPI.fulfillWithValue({ isAbort: true });
    }

    const isTimeStartValid = validateHhMm(currentLesson.time_start);
    const isTimeEndValid = validateHhMm(currentLesson.time_end);

    if (!isTimeStartValid || isCurrentLessonStartEmpty) {
      if (currentLesson.time_start.length && !isCurrentLessonStartEmpty) {
        toast.error(
          i18n.t("app.store.study-schedule.settings.changeTime.invalid"),
        );
      }

      return Promise.reject();
    }

    if (!isTimeEndValid || isCurrentLessonEndEmpty) {
      if (currentLesson.time_end.length && !isCurrentLessonEndEmpty) {
        toast.error(
          i18n.t("app.store.study-schedule.settings.changeTime.invalid"),
        );
      }

      return Promise.reject();
    }

    try {
      const response = await StudyScheduleApi.settings.updateMode({
        ...currentMode,
        schedule_setting_items: currentMode.lessons,
      });

      return {
        isNew: currentLesson.isNew,
        response,
      };
    } catch (error) {
      toast.error(
        i18n.t("app.store.study-schedule.settings.changeTime.requestError"),
      );

      return Promise.reject();
    }
  },
);

export const onModeDeleteAction = createAsyncThunk<Promise<void>, Id>(
  "settings/onModeDeleteAction",
  async (modeId, { dispatch }) => {
    await dispatch(deleteModeAction(modeId));
    dispatch(
      loadSettingsModesAction({
        page: 1,
      }),
    );
  },
);

export const deleteModeAction = createAsyncThunk<unknown, Id>(
  "settings/deleteModeAction",
  async (modeId, thunkAPI) => {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

    try {
      return await StudyScheduleApi.settings.deleteMode(modeId);
    } catch (error) {
      return Promise.reject();
    } finally {
      thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
    }
  },
);

export const renameModeAction = createAsyncThunk<
  TSettingsRenameModeAction,
  TSettingsRenameModeAction
>("settings/renameModeAction", async (action, thunkAPI) => {
  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    await StudyScheduleApi.settings.renameMode({
      name: action.newName,
      id: action.modeId,
      schedule_setting_items: action.lessons,
    });

    return action;
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const createModeAction = createAsyncThunk<
  TSettingsMode,
  TModeCreateAction,
  { state: RootState }
>("settings/createModeAction", async (action, { dispatch }) => {
  dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    return await StudyScheduleApi.settings.createMode(action);
  } catch (error) {
    return Promise.reject();
  } finally {
    dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});
