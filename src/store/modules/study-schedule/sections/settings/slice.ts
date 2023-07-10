import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "i18next";
import { IMask } from "react-imask";
import { toast } from "react-toastify";
import { clearDuplicateItemsById } from "@store/helpers";
import {
  createModeAction,
  deleteModeAction,
  deleteModeLessonAction,
  loadSettingsModesAction,
  modeLessonTimeChangeFinishAction,
  renameModeAction,
} from "@store/modules/study-schedule/sections/settings/actions";
import {
  ISettingsStore,
  MAX_AVAILABLE_LESSONS,
  TimeChangeProps,
  TSettingsMode,
  TSettingsModeLesson,
} from "@domain/entity/study-schedule";

const initialState: ISettingsStore = {
  currentModeId: undefined,
  modes: [],
  error: null,
  loading: "loading",
  isProcessBusy: false,

  modeModalCreate: {},
};

export const settingsSlice = createSlice({
  name: "StudySchedule/Settings",
  initialState,
  reducers: {
    setModeCreateModalStatus(state, { payload }: PayloadAction<boolean>) {
      state.modeModalCreate.isShown = payload;
    },
    onLessonCreate(state) {
      state.modes = state.modes.map((mode) => {
        if (mode.id === state.currentModeId) {
          if (mode.lessons.length === MAX_AVAILABLE_LESSONS) {
            toast.error(
              i18n.t("app.store.study-schedule.settings.createItem.max_error"),
            );

            return mode;
          }

          if (mode.lessons.find((lesson) => lesson.isNew)) {
            toast.error(
              i18n.t(
                "app.store.study-schedule.settings.createItem.duplicate_error",
              ),
            );
          } else {
            mode.lessons.push({
              time_start: "",
              time_end: "",
              isNew: true,
            });
          }
        }

        return mode;
      });
    },
    onModeLessonTimeChange(state, { payload }: PayloadAction<TimeChangeProps>) {
      state.modes = state.modes.map((mode) => {
        if (mode.id == state.currentModeId) {
          mode.lessons = mode.lessons.map(
            (lesson: TSettingsModeLesson, index) => {
              if (index === payload.lessonIndex) {
                lesson.isChanged = true;

                let value = payload.value;
                const iMask = IMask.createMask({
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  overwrite: true,
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  autofix: true,
                  mask: "hours:minutes",
                  blocks: {
                    hours: {
                      mask: IMask.MaskedRange,
                      placeholderChar: "HH",
                      from: 0,
                      to: 23,
                      maxLength: 2,
                    },
                    minutes: {
                      mask: IMask.MaskedRange,
                      placeholderChar: "MM",
                      from: 0,
                      to: 59,
                      maxLength: 2,
                    },
                  },
                });

                if (value.length === 1 && parseInt(value) > 2) {
                  value = `0${value}`;
                }

                lesson[payload.field] = iMask.resolve(value) as never;
              }

              return lesson;
            },
          );
        }

        return mode;
      });
    },
    onCurrentModeChange(
      store,
      { payload: item }: PayloadAction<TSettingsMode>,
    ) {
      store.currentModeId = item.id;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadSettingsModesAction.pending, (store, { meta }) => {
        if (meta.arg.page === 1 || !store.modes.length) {
          store.modes = [];
          store.loading = "loading";
          store.error = null;
          store.currentModeId = null;

          return;
        }

        store.loading = "still-loading";
      })
      .addCase(loadSettingsModesAction.fulfilled, (store, { payload }) => {
        store.loading = "idle";

        const modes = clearDuplicateItemsById([
          ...store.modes,
          ...payload.data,
        ]);

        store.pagination = payload;
        store.modes = modes;

        if (!store.currentModeId && modes.length) {
          store.currentModeId = modes[0].id;
        }
      })
      .addCase(loadSettingsModesAction.rejected, (store) => {
        store.loading = "error";
        store.error = new Error(i18n.t("app.request.failedLoad") as string);
      });

    function changeLessonField(
      state: ISettingsStore,
      action: any,
      options: { name: keyof TSettingsModeLesson; value: any },
    ): void {
      state.modes = state.modes.map((mode) => {
        if (mode.id === state.currentModeId) {
          mode.lessons = mode.lessons.map((lesson, index) => {
            if (action === null) {
              lesson[options.name] = options.value as never;
            } else if (index === action.meta.arg.lessonIndex) {
              lesson[options.name] = options.value as never;
            }

            return lesson;
          });
        }

        return mode;
      });
    }

    builder
      .addCase(deleteModeLessonAction.pending, (state, action) => {
        changeLessonField(state, action, {
          name: "isLoading",
          value: true,
        });
      })
      .addCase(deleteModeLessonAction.fulfilled, (state, action) => {
        const {
          meta: {
            arg: { modeId },
          },
          payload: { lessons },
        } = action;

        state.modes = state.modes.map((mode) => {
          if (mode.id === modeId) {
            mode.lessons = lessons;
          }

          return mode;
        });

        toast.success(
          i18n.t("app.store.study-schedule.settings.removeModeLesson.success"),
        );
      })
      .addCase(deleteModeLessonAction.rejected, (state, action) => {
        changeLessonField(state, action, {
          name: "isLoading",
          value: false,
        });

        toast.error(
          i18n.t("app.store.study-schedule.settings.removeModeLesson.error"),
        );
      });

    builder
      .addCase(modeLessonTimeChangeFinishAction.pending, (state, action) => {
        changeLessonField(state, action, {
          name: "isLoading",
          value: true,
        });
        changeLessonField(state, action, {
          name: "isValid",
          value: true,
        });
      })
      .addCase(
        modeLessonTimeChangeFinishAction.fulfilled,
        (
          state,
          action: PayloadAction<{
            isAbort: boolean;
            isNew: boolean;
          }>,
        ) => {
          changeLessonField(state, action, {
            name: "isLoading",
            value: false,
          });

          changeLessonField(state, action, {
            name: "isChanged",
            value: false,
          });

          if (action.payload.isAbort) {
            return;
          }

          changeLessonField(state, null, {
            name: "isNew",
            value: false,
          });

          if (action.payload.isNew) {
            toast.success(
              i18n.t("app.store.study-schedule.settings.createItem.created"),
            );
          } else {
            toast.success(
              i18n.t("app.store.study-schedule.settings.changeTime.success"),
            );
          }
        },
      )
      .addCase(
        modeLessonTimeChangeFinishAction.rejected,
        (state, action: PayloadAction<any>) => {
          changeLessonField(state, action, {
            name: "isLoading",
            value: false,
          });
        },
      );

    builder
      .addCase(deleteModeAction.pending, (state) => {
        state.isProcessBusy = true;
        state.loading = "loading";
      })
      .addCase(deleteModeAction.fulfilled, (state) => {
        state.isProcessBusy = false;

        toast.success(
          i18n.t("app.store.study-schedule.settings.removeMode.success"),
        );
      })
      .addCase(deleteModeAction.rejected, (state) => {
        state.isProcessBusy = false;
        state.loading = "idle";

        toast.error(
          i18n.t("app.store.study-schedule.settings.removeMode.error"),
        );
      });

    builder
      .addCase(renameModeAction.pending, (state, action) => {
        state.modes = state.modes.map((item) => {
          if (item.id === action.meta.arg.modeId) {
            item.loading = "loading";
          }

          return item;
        });
      })
      .addCase(renameModeAction.fulfilled, (state, { payload }) => {
        state.modes = state.modes.map((item) => {
          if (item.id === payload.modeId) {
            item.name = payload.newName;
            item.loading = "idle";
          }

          return item;
        });

        toast.success(
          i18n.t("app.store.study-schedule.settings.renameMode.success"),
        );
      })
      .addCase(renameModeAction.rejected, () => {
        toast.error(
          i18n.t("app.store.study-schedule.settings.renameMode.error"),
        );
      });

    builder
      .addCase(createModeAction.pending, (state) => {
        state.isProcessBusy = true;
        state.modeModalCreate.loading = "loading";
      })
      .addCase(createModeAction.fulfilled, (state, { payload, meta }) => {
        state.isProcessBusy = false;

        state.modes = [
          ...state.modes,
          {
            ...payload,
            lessons: Array(+meta.arg.lessonCount)
              .fill({})
              .map(() => ({
                time_start: "00:00",
                time_end: "00:00",
                isNew: true,
              })),
          },
        ];
        state.currentModeId = payload.id;

        state.modeModalCreate.isShown = false;
        state.modeModalCreate.loading = "idle";

        toast.success(
          i18n.t("app.store.study-schedule.settings.createMode.success"),
        );
      })
      .addCase(createModeAction.rejected, (state) => {
        state.isProcessBusy = false;
        state.modeModalCreate.loading = "idle";

        toast.error(
          i18n.t("app.store.study-schedule.settings.createMode.error"),
        );
      });
  },
});
