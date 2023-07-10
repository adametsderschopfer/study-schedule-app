import React from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { EmptyList } from "@ui/components/empty-list/EmptyList";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { TableTightLoader } from "@ui/skeletons/components/table-tight/TableTightLoader";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loadTeachersAction } from "@store/modules/study-schedule/sections/faculties/sections/teachers/actions";
import {
  selectStudyScheduleFacultyTeachers,
  selectStudyScheduleFacultyTeachersSearchString,
} from "@store/modules/study-schedule/sections/faculties/sections/teachers/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { ITeacherEntity } from "@domain/entity/study-schedule/index";
import { useList } from "@app/hooks/useList";
import { TeachersItem } from "@app/pages/client/study-schedule/faculties/departments/teachers/components/teachers-item/TeachersItem";

export const TeachersList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const teachers = useAppSelector(selectStudyScheduleFacultyTeachers);
  const { type: moduleType } = useAppSelector(selectStudySchedule);

  const { searchString, list, pagination } = useList<ITeacherEntity>({
    sortType: teachers.currentSortType,
    pagination: teachers.pagination,
    originalList: teachers.list,
    searchFields: ["full_name", "position", "degree"],
    selectSearchString: selectStudyScheduleFacultyTeachersSearchString,
  });

  if (!list.length) {
    if (searchString) {
      return (
        <EmptyList
          title={t("app.request.searchFailedTitle")}
          description={t("app.request.searchFailedDescription")}
        />
      );
    }

    return (
      <EmptyList
        title={t(
          `app.pages.StudySchedule.orgStructure.teachers.emptyTitle.${moduleType}`,
        )}
        description={t(
          `app.pages.StudySchedule.orgStructure.teachers.emptyDescription.${moduleType}`,
        )}
      />
    );
  }

  return (
    <ErrorBoundary>
      <InfiniteScroll
        pageStart={1}
        loadMore={(pageNumber): void => {
          dispatch(
            loadTeachersAction({
              page: pageNumber,
            }),
          );
        }}
        hasMore={
          teachers.loading === "still-loading" ? false : !pagination.isFinished
        }>
        {list.map((item, index) => (
          <TeachersItem
            key={`TeachersItem_${index}_${item.id}`}
            isLastItem={index === list.length - 1}
            {...item}
          />
        ))}

        {teachers.loading === "still-loading" && (
          <>
            <TableTightLoader />
            <TableTightLoader />
            <TableTightLoader />
          </>
        )}
      </InfiniteScroll>
    </ErrorBoundary>
  );
};
