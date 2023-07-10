import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CircleButton } from "@ui/components/button/circle-button/CircleButton";
import { EmptyList } from "@ui/components/empty-list/EmptyList";
import { ErrorView } from "@ui/components/error-view/ErrorView";
import { Input } from "@ui/components/input/Input";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { settingsSlice } from "@store/modules";
import {
  deleteModeLessonAction,
  modeLessonTimeChangeFinishAction,
} from "@store/modules/study-schedule/sections/settings/actions";
import {
  selectStudyScheduleSettings,
  selectStudyScheduleSettingsCurrentMode,
} from "@store/modules/study-schedule/sections/settings/selector";
import {
  StyledSettingsModesLessonsHead,
  StyledSettingsModesLessonsHeadTitle,
  StyledSettingsModesLessonsItem,
  StyledSettingsModesLessonsItemRemoveButton,
  StyledSettingsModesLessonsItems,
  StyledSettingsModesLessonsItemTimeGroup,
  StyledSettingsModesLessonsItemTitle,
  StyledSettingsModesLessonsWrapper,
} from "@app/pages/client/study-schedule/settings/components/settings-modes/settings-modes-lessons/styled";

const langBasePath = "app.features.study-schedule.settings.settings-modes";

export const SettingsModesLessons: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const listRef = useRef<HTMLDivElement>();
  const settings = useAppSelector(selectStudyScheduleSettings);
  const currentMode = useAppSelector(selectStudyScheduleSettingsCurrentMode);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: 0,
      });
    }
  }, [currentMode]);

  const handleCreate = async (): Promise<void> => {
    await dispatch(settingsSlice.actions.onLessonCreate());

    if (listRef.current) {
      listRef.current.scrollTo({
        behavior: "smooth",
        top: listRef.current?.scrollHeight,
      });
    }
  };

  const handleTimeInputFocus = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (event.target.value === "00:00") {
      event.target.value = "";
    }
  };

  if (!settings.modes.length) {
    return (
      <EmptyList
        title={t(`${langBasePath}.emptyLessonTitle`)}
        description={t(`${langBasePath}.emptyLessonDescription`)}
      />
    );
  }

  if (!currentMode) {
    return <ErrorView title={t(`${langBasePath}.lessonsError`)} />;
  }

  return (
    <StyledSettingsModesLessonsWrapper>
      <StyledSettingsModesLessonsHead>
        <StyledSettingsModesLessonsHeadTitle>
          {currentMode.name}
        </StyledSettingsModesLessonsHeadTitle>

        <CircleButton onClick={handleCreate} />
      </StyledSettingsModesLessonsHead>

      <StyledSettingsModesLessonsItems ref={listRef}>
        {!currentMode.lessons.length ? (
          <EmptyList
            title={t(`${langBasePath}.emptyLessonTitle`)}
            description={t(`${langBasePath}.emptyLessonDescription`)}
          />
        ) : (
          currentMode.lessons.map((lesson, index) => (
            <StyledSettingsModesLessonsItem
              key={`Setting_modes_lessons_item_${index}`}
              isLoading={lesson.isLoading}
              isNew={lesson.isNew}>
              <StyledSettingsModesLessonsItemTitle>
                {index + 1} {t(`${langBasePath}.lessonItem`)}
              </StyledSettingsModesLessonsItemTitle>

              <StyledSettingsModesLessonsItemTimeGroup>
                <Input
                  isWide={true}
                  value={lesson.time_start}
                  onFocus={handleTimeInputFocus}
                  onBlur={(): void => {
                    dispatch(
                      modeLessonTimeChangeFinishAction({ lessonIndex: index }),
                    );
                  }}
                  onInput={(value: string): void => {
                    dispatch(
                      settingsSlice.actions.onModeLessonTimeChange({
                        field: "time_start",
                        value,
                        lessonIndex: index,
                      }),
                    );
                  }}
                />

                <span>-</span>

                <Input
                  isWide={true}
                  value={lesson.time_end}
                  onFocus={handleTimeInputFocus}
                  onBlur={(): void => {
                    dispatch(
                      modeLessonTimeChangeFinishAction({ lessonIndex: index }),
                    );
                  }}
                  onInput={(value: string): void => {
                    dispatch(
                      settingsSlice.actions.onModeLessonTimeChange({
                        field: "time_end",
                        value,
                        lessonIndex: index,
                      }),
                    );
                  }}
                />
              </StyledSettingsModesLessonsItemTimeGroup>

              <StyledSettingsModesLessonsItemRemoveButton
                headerTitle={t(`${langBasePath}.lessonItem`)}
                onRemoveComplete={(): void => {
                  dispatch(
                    deleteModeLessonAction({
                      modeId: currentMode.id,
                      lessonIndex: index,
                    }),
                  );
                }}>
                <svg
                  width={"15"}
                  height={"2"}
                  viewBox={"0 0 15 2"}
                  fill={"none"}
                  xmlns={"http://www.w3.org/2000/svg"}>
                  <path
                    d={"M1.09961 1L13.8996 1"}
                    stroke={"currentColor"}
                    strokeWidth={"2"}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                  />
                </svg>
              </StyledSettingsModesLessonsItemRemoveButton>
            </StyledSettingsModesLessonsItem>
          ))
        )}
      </StyledSettingsModesLessonsItems>
    </StyledSettingsModesLessonsWrapper>
  );
};
