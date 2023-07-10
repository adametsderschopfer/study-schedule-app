import React from "react";
import { useTranslation } from "react-i18next";
import { EmptyList } from "@ui/components/empty-list/EmptyList";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loadSubjectAction } from "@store/modules/study-schedule/sections/faculties/sections/subject/actions";
import {
  selectStudyScheduleFacultySubject,
  selectStudyScheduleFacultySubjectSearchString,
} from "@store/modules/study-schedule/sections/faculties/sections/subject/selector";
import { ISubjectEntity } from "@domain/entity/study-schedule/index";
import { useList } from "@app/hooks/useList";
import { SubjectItem } from "@app/pages/client/study-schedule/faculties/departments/subject/components/subject-item/SubjectItem";
import {
  StyledSubjectLineItemLoader,
  StyledSubjectList,
} from "@app/pages/client/study-schedule/faculties/departments/subject/components/subject-list/styled";

export const SubjectList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const subject = useAppSelector(selectStudyScheduleFacultySubject);

  const { searchString, list, pagination } = useList<ISubjectEntity>({
    pagination: subject.pagination,
    originalList: subject.list,
    searchFields: ["name"],
    selectSearchString: selectStudyScheduleFacultySubjectSearchString,
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
        title={t("app.pages.StudySchedule.orgStructure.subject.emptyTitle")}
        description={t(
          "app.pages.StudySchedule.orgStructure.subject.emptyDescription",
        )}
      />
    );
  }

  return (
    <div>
      <StyledSubjectList
        pageStart={1}
        loadMore={(pageNumber): void => {
          dispatch(
            loadSubjectAction({
              page: pageNumber,
            }),
          );
        }}
        hasMore={
          subject.loading === "still-loading" ? false : !pagination.isFinished
        }>
        <ErrorBoundary>
          {list.map((item) => (
            <SubjectItem key={`Subject_item_${item.id}`} item={item} />
          ))}
        </ErrorBoundary>

        {subject.loading === "still-loading" && (
          <>
            <StyledSubjectLineItemLoader />
            <StyledSubjectLineItemLoader />
            <StyledSubjectLineItemLoader />
          </>
        )}
      </StyledSubjectList>
    </div>
  );
};
