import { createSelector } from "@reduxjs/toolkit";
import { getEnumValues } from "@utils/helper";
import i18n from "i18next";
import { TCrumb } from "@ui/components/breadcrumbs/types";
import { selectDetailDepartmentBreadcrumbs } from "@store/modules/study-schedule/sections/faculties/sections/department/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { RootState } from "@store/rootReducer";
import { createScheduleTableSelector } from "@domain/entity/study-schedule/data";
import {
  ELevelsOfEducationSchool,
  EStudyScheduleTypes,
  ICreateGroupScheduleModal,
  IEditGroupScheduleModal,
  IGroupScheduleStore,
  IScheduleItem,
} from "@domain/entity/study-schedule/index";

export const selectGroupSchedule = (state: RootState): IGroupScheduleStore =>
  state.modules.studySchedule.orgStructure.schedule;

export const selectGroupScheduleTable = createSelector(
  selectGroupSchedule,
  createScheduleTableSelector,
);

export const selectGroupScheduleName = createSelector(
  selectStudySchedule,
  selectGroupSchedule,
  (studySchedule, schedule): string => {
    switch (studySchedule.type) {
      case EStudyScheduleTypes.SCHOOL: {
        return `${schedule.detailGroup.year_of_education} ${
          getEnumValues(ELevelsOfEducationSchool)[
            schedule.detailGroup.degree === 0
              ? schedule.detailGroup.degree
              : schedule.detailGroup.degree - 1
          ]
        } ${i18n.t("app.store.study-schedule.YearsOfEducationSchool")}`;
      }

      default: {
        return schedule.detailGroup.name;
      }
    }
  },
);

export const selectGroupScheduleBreadcrumbs = createSelector(
  selectGroupSchedule,
  selectGroupScheduleName,
  selectDetailDepartmentBreadcrumbs,
  (schedule, scheduleName, departmentBreadcrumbs): TCrumb[] => [
    ...departmentBreadcrumbs,
    {
      title: scheduleName,
      href:
        departmentBreadcrumbs[departmentBreadcrumbs.length - 1]?.href +
          `group/schedule/${schedule.detailGroup.id}` || "/",
    },
  ],
);

const selectGroupScheduleCurrent = (
  state: IGroupScheduleStore,
  modal: ICreateGroupScheduleModal | IEditGroupScheduleModal,
): IScheduleItem | undefined => {
  return state.list.find(
    (item) => item.id === (modal.itemId || modal.item?.id),
  );
};

export const selectGroupScheduleEditCurrent = createSelector(
  selectGroupSchedule,
  (state) => selectGroupScheduleCurrent(state, state.editModal),
);

export const selectGroupScheduleCreateCurrent = createSelector(
  selectGroupSchedule,
  (state) => selectGroupScheduleCurrent(state, state.createModal),
);
