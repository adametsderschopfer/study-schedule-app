import { getEnumValues, num2word } from "@utils/helper";
import i18n from "i18next";
import { DateTime } from "luxon";
import { DATE_FORMAT, TSelectData } from "@domain/app";
import {
  EFormsOfEducation,
  ELevelsOfEducation,
  ELevelsOfEducationSchool,
  EScheduleType,
  EStudyScheduleTypes,
  ESubGroupList,
  EYearsOfEducation,
  EYearsOfEducationCollege,
  EYearsOfEducationSchool,
  IScheduleApiResult,
  IScheduleItem,
  IScheduleTableRow,
  IScheduleTableRowCell,
  IScheduleTableRowCreator,
  IScheduleTableRowDate,
  TSettingLesson,
} from "@domain/entity/study-schedule/index";

export const getSubGroupAsSelectOptions = (
  hasCommon = false,
): TSelectData<number>[] => {
  const subGroup = getEnumValues(ESubGroupList);

  return subGroup.reduce<TSelectData<number>[]>((_result, _, currentIndex) => {
    const result = [..._result];

    if (currentIndex === 0) {
      if (hasCommon) {
        result.push({
          label: i18n.t(`app.store.study-schedule.SubGroups_common`),
          value: currentIndex,
        });
      }

      return result;
    }

    result.push({
      label: `${currentIndex} ${num2word(currentIndex, [
        i18n.t(`app.store.study-schedule.SubGroups_1`),
        i18n.t(`app.store.study-schedule.SubGroups_2`),
        i18n.t(`app.store.study-schedule.SubGroups_3`),
      ])}`,
      value: currentIndex,
    });

    return result;
  }, []);
};

export const getFormOfEducationAsSelectOptions = (): TSelectData<number>[] => {
  const forms = getEnumValues(EFormsOfEducation);

  return forms.reduce<TSelectData<number>[]>(
    (result, _, currentIndex) => [
      ...result,
      {
        label: i18n.t(
          `app.store.study-schedule.FormsOfEducation.${currentIndex + 1}`,
        ),
        value: currentIndex + 1,
      },
    ],
    [],
  );
};

export const getYearOfEducationAsSelectOptions = (
  moduleType: EStudyScheduleTypes,
): TSelectData<number>[] => {
  const isSchool = moduleType === EStudyScheduleTypes.SCHOOL;
  const isCollege = moduleType === EStudyScheduleTypes.COLLEGE;
  const years = getEnumValues(
    isSchool
      ? EYearsOfEducationSchool
      : isCollege
      ? EYearsOfEducationCollege
      : EYearsOfEducation,
  );

  return years.reduce<TSelectData<number>[]>(
    (result, _, currentIndex) => [
      ...result,
      {
        label: `${currentIndex + 1} ${
          isSchool
            ? i18n.t("app.store.study-schedule.YearsOfEducationSchool")
            : i18n.t("app.store.study-schedule.YearsOfEducation")
        }`,
        value: currentIndex + 1,
      },
    ],
    [],
  );
};

export const getLevelsOfEducationAsSelectOptions = (
  moduleType: EStudyScheduleTypes,
): TSelectData<number | string>[] => {
  const isSchool = moduleType === EStudyScheduleTypes.SCHOOL;
  const levels = getEnumValues(
    isSchool ? ELevelsOfEducationSchool : ELevelsOfEducation,
  );

  return levels.reduce<TSelectData<number | string>[]>(
    (result, level, currentIndex) => [
      ...result,
      {
        label: isSchool
          ? level
          : i18n.t(
              `app.store.study-schedule.LevelsOfEducation.${currentIndex + 1}`,
            ),
        value: isSchool ? level.toString().toLowerCase() : currentIndex + 1,
      },
    ],
    [],
  );
};

export const getScheduleTypeName = (type: EScheduleType): string => {
  return i18n.t(`app.pages.StudySchedule.enum.EScheduleType.${type}`);
};

export const createScheduleTableSelector = (schedule: {
  list: IScheduleItem[];
}): IScheduleTableRowCreator => {
  const datesRow: IScheduleTableRowDate[] = [
    ...new Set(
      Array.from(schedule.list).map((item) => item.executionDate as string),
    ),
  ]
    .filter((item) => !!item)
    .sort(
      (a, b) =>
        DateTime.fromFormat(a, DATE_FORMAT).toJSDate().getTime() -
        DateTime.fromFormat(b, DATE_FORMAT).toJSDate().getTime(),
    )
    .map((date) => ({ date: date }));

  const rows: IScheduleTableRowCreator["rows"] = [];

  for (const item of schedule.list) {
    const order = item.schedule_setting_item_order + 1;
    const dateRowIndex = datesRow.findIndex(
      (dRow: IScheduleTableRowDate) => dRow.date === item.executionDate,
    );
    let rowIndex = rows.findIndex((row) => row.info.order === order);

    if (dateRowIndex === -1) {
      console.error("Invalid item ->", item);
      console.error("Invalid item executionDate ->", item.executionDate);

      continue;
    }

    const createRow = (): IScheduleTableRow => {
      const time: TSettingLesson | null = item.schedule_setting_item?.length
        ? item.schedule_setting_item[0]
        : null;

      return {
        info: {
          schedule_setting_id: item.schedule_setting_id,
          order,
          time: {
            start: time?.time_start || "--:--",
            end: time?.time_end || "--:--",
          },
        },
        cells: Array(datesRow.length).fill(null),
      };
    };

    const createItem = (): IScheduleTableRowCell => ({
      schedule: item,
      date: datesRow[dateRowIndex].date,
    });

    const createNewRow = (): void => {
      const row = createRow();
      row.cells[dateRowIndex] = createItem();

      rows.push(row);
    };

    if (rowIndex === -1) {
      createNewRow();
      continue;
    }

    rowIndex = rows.findIndex(
      (row) => row.info.order === order && !row.cells[dateRowIndex],
    );

    if (rowIndex !== -1) {
      rows[rowIndex].cells[dateRowIndex] = createItem();
    } else {
      createNewRow();
    }
  }

  return {
    datesRow,
    rows: rows.sort((a, b) => a.info.order - b.info.order),
  };
};

export const processSchedulesRepeatabilities = ({
  data,
  repeatabilities,
}: IScheduleApiResult): IScheduleItem[] => {
  if (!repeatabilities || !repeatabilities.length) {
    return [];
  }

  return repeatabilities.reduce<IScheduleItem[]>((schedules, repeatability) => {
    const scheduleItem = data.find((item) => item.id === repeatability.id);

    if (!scheduleItem) {
      return [...schedules];
    }

    return [
      ...schedules,
      {
        ...scheduleItem,
        executionDate: repeatability.date,
      },
    ];
  }, []);
};

export const getStudyScheduleTypeName = (type: EStudyScheduleTypes): string => {
  return i18n.t(`app.studyScheduleTypeNames.${type}`);
};
