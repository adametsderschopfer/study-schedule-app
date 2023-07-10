import { getEnumValues } from "@utils/helper";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@store/hooks";
import { selectGroupSchedule } from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { TSelectData } from "@domain/app";
import {
  EDayOfWeek,
  EScheduleRepeatability,
  EScheduleType,
  EStudyScheduleTypes,
  ESubGroupList,
} from "@domain/entity/study-schedule/index";

export type TUseScheduleStaticFields = {
  fields: {
    typeOptions: TSelectData<EScheduleType>[];
    subGroupOptions: TSelectData<ESubGroupList>[];
    repeatabilityOptions: TSelectData<EScheduleRepeatability>[];
    dayOfWeekOptions: TSelectData<EDayOfWeek>[];
  };
};

export const useScheduleStaticFields = (): TUseScheduleStaticFields => {
  const { t } = useTranslation();
  const { type: moduleType } = useAppSelector(selectStudySchedule);
  const schedule = useAppSelector(selectGroupSchedule);

  const typeOptions = getEnumValues(EScheduleType).map((typeName, index) => ({
    label: t(`app.store.study-schedule.ScheduleType.${typeName}`),
    value: index + 1,
  }));
  const repeatabilityOptions = getEnumValues(EScheduleRepeatability).map(
    (repeatName, index) => ({
      label: t(`app.enum.repeatability.${repeatName}`),
      value: index,
    }),
  );
  const dayOfWeekOptions = getEnumValues(EDayOfWeek).map((dayName, index) => ({
    label: t(`app.enum.days.${dayName}`),
    value: index + 1,
  }));

  const getSubGroupOptions = (
    subGroupLength: number,
  ): TSelectData<ESubGroupList>[] =>
    getEnumValues(ESubGroupList)
      .map((_, index) => ({
        label:
          index === 0
            ? t(`app.store.study-schedule.SubGroups_common`)
            : `${index} ${t(`app.store.study-schedule.SubGroups_1`)}`,
        value: index,
      }))
      .slice(0, subGroupLength + 1);

  const filterRepeatabilityByModuleType = (
    options: TSelectData<EScheduleRepeatability>[],
  ): TSelectData<EScheduleRepeatability>[] => {
    return options.filter((option) => {
      switch (moduleType) {
        case EStudyScheduleTypes.SCHOOL: {
          return [
            EScheduleRepeatability.ONCE,
            EScheduleRepeatability.EVERY_WEEK,
          ].includes(option.value);
        }

        default: {
          return [
            EScheduleRepeatability.ODD_WEEK,
            EScheduleRepeatability.EVERY_WEEK,
            EScheduleRepeatability.EVEN_WEEK,
          ].includes(option.value);
        }
      }
    });
  };

  return useMemo<TUseScheduleStaticFields>(
    () => ({
      fields: {
        typeOptions,
        subGroupOptions: getSubGroupOptions(schedule.detailGroup.sub_group),
        repeatabilityOptions:
          filterRepeatabilityByModuleType(repeatabilityOptions),
        dayOfWeekOptions,
      },
    }),
    [schedule.detailGroup],
  );
};
