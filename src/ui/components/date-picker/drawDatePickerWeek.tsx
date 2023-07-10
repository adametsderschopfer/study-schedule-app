import { DateTime } from "luxon";
import React from "react";
import { StyledCalendarActiveWeek } from "@ui/components/date-picker/styled";
import { DATE_FORMAT } from "@domain/app";

type TDrawDatePickerWeekResult = (
  dayOfMonth: number,
  _currentDate: Date,
) => JSX.Element;

export const drawDatePickerWeek = (
  dateNow?: Date,
  dateStart?: string,
  dateEnd?: string,
): TDrawDatePickerWeekResult => {
  return (dayOfMonth, _currentDate): JSX.Element => {
    let isActive = false;
    let isSelected = false;

    if (dateStart && dateEnd && dateNow) {
      const selectedDate = DateTime.fromJSDate(dateNow);
      const currentDate = DateTime.fromJSDate(_currentDate);

      const date = DateTime.fromFormat(dateStart, DATE_FORMAT);

      const monday = date.startOf("week");
      const saturday = monday.plus({ days: 6 });

      isSelected = currentDate.day === selectedDate.day;
      isActive = currentDate >= monday && currentDate <= saturday;
    }

    return (
      <StyledCalendarActiveWeek isActive={isActive && !isSelected}>
        {dayOfMonth}
      </StyledCalendarActiveWeek>
    );
  };
};
