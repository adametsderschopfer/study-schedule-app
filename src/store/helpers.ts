import _ from "lodash";
import { DateTime } from "luxon";
import { DATE_FORMAT } from "@domain/app";

export const getWeekByDate = (
  currentDate: Date,
): {
  dateStart: string;
  dateEnd: string;
} => {
  const date = DateTime.fromJSDate(currentDate);
  const monday = date.startOf("week");
  const saturday = monday.plus({ days: 5 });

  const dateStart = monday.toFormat(DATE_FORMAT);
  const dateEnd = saturday.toFormat(DATE_FORMAT);

  return {
    dateStart,
    dateEnd,
  };
};

export const clearDuplicateItemsById = <T extends { id?: Id }>(
  items: T[],
): T[] => _.uniqBy(items, (item) => item.id);
