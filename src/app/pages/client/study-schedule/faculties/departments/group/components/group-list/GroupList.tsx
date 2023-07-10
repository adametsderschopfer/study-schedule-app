import React from "react";
import { useTranslation } from "react-i18next";
import {
  StyledCardList,
  StyledCardListWrapper,
} from "@ui/components/card/card-list/styled";
import { EmptyList } from "@ui/components/empty-list/EmptyList";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { CardLoader } from "@ui/skeletons/components/card/CardLoader";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loadGroupAction } from "@store/modules/study-schedule/sections/faculties/sections/group/actions";
import {
  selectStudyScheduleDepartmentGroup,
  selectStudyScheduleDepartmentGroupSearchString,
} from "@store/modules/study-schedule/sections/faculties/sections/group/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { IGroupEntity } from "@domain/entity/study-schedule/index";
import { useList } from "@app/hooks/useList";
import { GroupItem } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-item/GroupItem";

export const GroupList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { type: moduleType } = useAppSelector(selectStudySchedule);
  const group = useAppSelector(selectStudyScheduleDepartmentGroup);

  const { searchString, list, pagination } = useList<IGroupEntity>({
    pagination: group.pagination,
    originalList: group.list,
    searchFields: ["name", "letter"],
    selectSearchString: selectStudyScheduleDepartmentGroupSearchString,
  });

  if (!list.length) {
    if (searchString || group.filters.length) {
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
          `app.pages.StudySchedule.orgStructure.group.emptyListTitle.${moduleType}`,
        )}
        description={t(
          `app.pages.StudySchedule.orgStructure.group.emptyListDescription.${moduleType}`,
        )}
      />
    );
  }

  return (
    <StyledCardListWrapper>
      <ErrorBoundary>
        <StyledCardList
          pageStart={1}
          loadMore={(pageNumber): void => {
            dispatch(
              loadGroupAction({
                page: pageNumber,
              }),
            );
          }}
          hasMore={
            group.loading === "still-loading" || group.filters.length
              ? false
              : !pagination.isFinished
          }>
          {list.map((item) => (
            <ErrorBoundary key={`Group_item_${item.id}_${item.department_id}`}>
              <GroupItem moduleType={moduleType} item={item} />
            </ErrorBoundary>
          ))}

          {group.loading === "still-loading" && (
            <>
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </>
          )}
        </StyledCardList>
      </ErrorBoundary>
    </StyledCardListWrapper>
  );
};
