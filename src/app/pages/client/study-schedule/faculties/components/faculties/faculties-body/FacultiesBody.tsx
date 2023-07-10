import React from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { EmptyList } from "@ui/components/empty-list/EmptyList";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loadFacultiesAction } from "@store/modules/study-schedule/sections/faculties/actions";
import {
  selectStudyScheduleFaculty,
  selectStudyScheduleFacultySearchString,
} from "@store/modules/study-schedule/sections/faculties/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import {
  IDepartmentEntity,
  IFacultyEntity,
} from "@domain/entity/study-schedule";
import { useList } from "@app/hooks/useList";
import { FacultiesBodyItems } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-body/faculties-body-items/FacultiesBodyItems";

export const FacultiesBody: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { type: moduleType } = useAppSelector(selectStudySchedule);
  const faculty = useAppSelector(selectStudyScheduleFaculty);

  const { searchString, list, pagination } = useList<
    IFacultyEntity | IDepartmentEntity
  >({
    pagination: faculty.pagination,
    originalList: faculty.faculties,
    selectSearchString: selectStudyScheduleFacultySearchString,
    searchFields: ["name"],
  });

  if (!list.length) {
    if (searchString.length) {
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
          `app.pages.StudySchedule.orgStructure.faculties.emptyTitle.${moduleType}`,
        )}
        description={t(
          `app.pages.StudySchedule.orgStructure.faculties.emptyDescription.${moduleType}`,
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
            loadFacultiesAction({
              page: pageNumber,
            }),
          );
        }}
        hasMore={
          faculty.loading === "still-loading" ? false : !pagination.isFinished
        }>
        <FacultiesBodyItems list={list} />
      </InfiniteScroll>
    </ErrorBoundary>
  );
};
