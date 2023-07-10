import { DateTime } from "luxon";
import React, { useCallback, useMemo } from "react";
import { ReactDatePickerProps } from "react-datepicker";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@ui/components/date-picker/DatePicker";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { StyledContentBlock } from "@ui/components/layout/ContentBlock";
import {
  StyledTab,
  StyledTabList,
  StyledTabPanel,
} from "@ui/components/tabs/styled";
import { TypeSelectorItem } from "@ui/components/type-selector/types";
import { TypeSelector } from "@ui/components/type-selector/TypeSelector";
import { getWeekByDate } from "@store/helpers";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  selectSchedule,
  selectScheduleDisplayUrl,
} from "@store/modules/study-schedule/sections/schedule/selector";
import {
  createYMDDAteString,
  scheduleSlice,
} from "@store/modules/study-schedule/sections/schedule/slice";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { DATE_FORMAT } from "@domain/app";
import { MAX_DAYS_AVAILABLE } from "@domain/entity/study-schedule/index";
import {
  ScheduleFilterBodyTab,
  ScheduleFilterBodyTabTypes,
} from "@app/pages/client/study-schedule/schedule/schedule-filter/components/schedule-filter-body/schedule-filter-body-tab/ScheduleFilterBodyTab";
import {
  StyledScheduleFilterBodyTabs,
  StyledScheduleFilterButton,
  StyledScheduleFilterDatePicker,
  StyledScheduleFilterDatePickerDescription,
  StyledScheduleFilterForm,
  StyledScheduleFilterFormBody,
  StyledScheduleFilterSelectFixedDate,
} from "@app/pages/client/study-schedule/schedule/schedule-filter/components/schedule-filter-body/styled";

type TDateSelectorItem = {
  date_start: string;
  date_end?: string | null;
};

export const ScheduleFilterBody: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { type } = useAppSelector(selectStudySchedule);
  const schedule = useAppSelector(selectSchedule);
  const scheduleDisplayUrl = useAppSelector(selectScheduleDisplayUrl);

  const fixedDateSelector: TypeSelectorItem<TDateSelectorItem>[] = useMemo(
    () => [
      {
        name: t("app.pages.StudySchedule.schedule.fixedDate.now"),
        value: { date_start: createYMDDAteString() },
      },
      {
        name: t("app.pages.StudySchedule.schedule.fixedDate.tomorrow"),
        value: {
          date_start: createYMDDAteString(
            DateTime.fromJSDate(new Date()).plus({ day: 1 }).toJSDate(),
          ),
        },
      },
      {
        name: t("app.pages.StudySchedule.schedule.fixedDate.currentWeek"),
        value: {
          date_start: getWeekByDate(new Date()).dateStart,
          date_end: getWeekByDate(new Date()).dateEnd,
        },
      },
      {
        name: t("app.pages.StudySchedule.schedule.fixedDate.nextWeek"),
        value: {
          date_start: getWeekByDate(
            DateTime.fromJSDate(new Date()).plus({ week: 1 }).toJSDate(),
          ).dateStart,
          date_end: getWeekByDate(
            DateTime.fromJSDate(new Date()).plus({ week: 1 }).toJSDate(),
          ).dateEnd,
        },
      },
    ],
    [i18n.language],
  );

  const handleDateRangeSelect = (value: TDateSelectorItem): void => {
    dispatch(
      scheduleSlice.actions.setFilter({
        name: "date_start",
        value: value.date_start,
      }),
    );

    dispatch(
      scheduleSlice.actions.setFilter({
        name: "date_end",
        value: value?.date_end || undefined,
      }),
    );
  };

  const handleDateSelect: ReactDatePickerProps<"", true>["onChange"] =
    useCallback(
      (dates): void => {
        const [date_start, date_end] = dates;

        if (!date_start) {
          return;
        }

        if (schedule.filter.date_end) {
          handleDateRangeSelect({
            date_start: createYMDDAteString(date_start),
            date_end: undefined,
          });

          return;
        }

        handleDateRangeSelect({
          date_start: createYMDDAteString(date_start),
          date_end: date_end ? createYMDDAteString(date_end) : undefined,
        });
      },
      [schedule.filter],
    );

  const handleScheduleDisplayShow = useCallback((): void => {
    navigate(scheduleDisplayUrl);
  }, [scheduleDisplayUrl]);

  return (
    <StyledContentBlock>
      <StyledScheduleFilterBodyTabs>
        <StyledTabList>
          <StyledTab>
            {t(`app.pages.StudySchedule.schedule.tabItemSearchByGroup.${type}`)}
          </StyledTab>
          <StyledTab>
            {t(
              `app.pages.StudySchedule.schedule.tabItemSearchByTeacher.${type}`,
            )}
          </StyledTab>
          <StyledTab>
            {t(
              `app.pages.StudySchedule.schedule.tabItemSearchByClassroom.${type}`,
            )}
          </StyledTab>
        </StyledTabList>

        <StyledScheduleFilterForm>
          <StyledScheduleFilterDatePicker>
            <DatePicker
              maxDate={DateTime.fromFormat(
                schedule.filter.date_start,
                DATE_FORMAT,
              )
                .plus({ day: MAX_DAYS_AVAILABLE })
                .toJSDate()}
              selectsRange={true}
              selected={DateTime.fromFormat(
                schedule.filter.date_start,
                DATE_FORMAT,
              ).toJSDate()}
              startDate={DateTime.fromFormat(
                schedule.filter.date_start,
                DATE_FORMAT,
              ).toJSDate()}
              endDate={
                schedule.filter.date_end
                  ? DateTime.fromFormat(
                      schedule.filter.date_end,
                      DATE_FORMAT,
                    ).toJSDate()
                  : undefined
              }
              onChange={handleDateSelect}
            />
            <StyledScheduleFilterDatePickerDescription>
              {t(
                "app.pages.StudySchedule.orgStructure.schedule.datePickerDescription",
              )}
            </StyledScheduleFilterDatePickerDescription>
          </StyledScheduleFilterDatePicker>

          <StyledScheduleFilterFormBody>
            <StyledScheduleFilterSelectFixedDate>
              <TypeSelector
                currentValue={(
                  item: TypeSelectorItem<TDateSelectorItem>,
                ): boolean => {
                  if ("date_end" in item) {
                    return (
                      schedule.filter.date_start === item.value.date_start &&
                      schedule.filter.date_end === item.value.date_end
                    );
                  } else {
                    return schedule.filter.date_start === item.value.date_start;
                  }
                }}
                items={fixedDateSelector}
                onItemSelect={(item): void => {
                  handleDateRangeSelect(item.value);
                }}
              />
            </StyledScheduleFilterSelectFixedDate>

            <ErrorBoundary>
              <StyledTabPanel>
                <ScheduleFilterBodyTab
                  type={ScheduleFilterBodyTabTypes.GROUP}
                />
              </StyledTabPanel>
              <StyledTabPanel>
                <ScheduleFilterBodyTab
                  type={ScheduleFilterBodyTabTypes.TEACHER}
                />
              </StyledTabPanel>
              <StyledTabPanel>
                <ScheduleFilterBodyTab
                  type={ScheduleFilterBodyTabTypes.CLASSROOM}
                />
              </StyledTabPanel>
            </ErrorBoundary>

            <StyledScheduleFilterButton
              onClick={handleScheduleDisplayShow}
              mode={"wide"}>
              {t("app.pages.StudySchedule.schedule.showSchedule")}
            </StyledScheduleFilterButton>
          </StyledScheduleFilterFormBody>
        </StyledScheduleFilterForm>
      </StyledScheduleFilterBodyTabs>
    </StyledContentBlock>
  );
};
