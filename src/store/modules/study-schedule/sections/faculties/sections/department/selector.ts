import { createSelector } from "@reduxjs/toolkit";
import i18n from "i18next";
import { TCrumb } from "@ui/components/breadcrumbs/types";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { RootState } from "@store/rootReducer";
import {
  EStudyScheduleTypes,
  IFacultyDepartmentDetailStore,
} from "@domain/entity/study-schedule";

export const selectFacultyDepartmentInfo = (
  state: RootState,
): IFacultyDepartmentDetailStore =>
  state.modules.studySchedule.orgStructure.departmentDetailSlice;

export const selectDetailDepartmentInfo = createSelector(
  selectFacultyDepartmentInfo,
  (state) => state.detailInfo,
);

export const selectSectionParentId = createSelector(
  [selectFacultyDepartmentInfo, selectStudySchedule],
  (facultyInfo, studySchedule): Id | undefined => {
    const isUniversity = studySchedule.type === EStudyScheduleTypes.UNIVERSITY;
    const isCollege = studySchedule.type === EStudyScheduleTypes.COLLEGE;
    const isSchool = studySchedule.type === EStudyScheduleTypes.SCHOOL;

    if (!isSchool && (!facultyInfo || !facultyInfo.detailInfo)) {
      throw new Error("failed load selectFacultyDepartmentInfo");
    }

    if (isUniversity && facultyInfo.detailInfo) {
      return facultyInfo.detailInfo?.department?.id;
    }

    if (isCollege && facultyInfo.detailInfo) {
      return facultyInfo.detailInfo?.id;
    }

    return undefined;
  },
);

export const selectDetailDepartmentBreadcrumbs = createSelector(
  [selectDetailDepartmentInfo, selectStudySchedule],
  (detailDepartmentInfo, { type: moduleType }) => {
    const crumbs: TCrumb[] = [];

    if (moduleType === EStudyScheduleTypes.SCHOOL || !detailDepartmentInfo) {
      return [
        {
          title: i18n.t(
            `app.pages.StudySchedule.orgStructure.group.breadcrumbTitle`,
          ),
          href: "/client/study-schedule/faculties",
        },
      ];
    }

    crumbs.push({
      title: i18n.t(
        `app.pages.StudySchedule.orgStructure.breadcrumbsName.${moduleType}`,
      ),
      href: "/client/study-schedule/faculties",
    });

    crumbs.push({
      title: detailDepartmentInfo.name,
      href: "/client/study-schedule/faculties",
    });

    if (moduleType === EStudyScheduleTypes.UNIVERSITY) {
      crumbs.push({
        title: detailDepartmentInfo.department.name,
        href: `/client/study-schedule/faculties/${detailDepartmentInfo.department.faculty_id}/${detailDepartmentInfo.department.id}/`,
      });
    }

    return crumbs;
  },
);
