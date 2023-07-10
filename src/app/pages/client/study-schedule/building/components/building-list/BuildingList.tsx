import React from "react";
import { useTranslation } from "react-i18next";
import {
  StyledCardList,
  StyledCardListWrapper,
} from "@ui/components/card/card-list/styled";
import { EmptyList } from "@ui/components/empty-list/EmptyList";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { RequestError } from "@ui/components/error-view/error-view-variants/RequestError";
import { CardListLoader } from "@ui/skeletons/components/card/CardListLoader";
import { CardLoader } from "@ui/skeletons/components/card/CardLoader";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loadBuildingAction } from "@store/modules/study-schedule/sections/building/actions";
import {
  selectStudyScheduleBuilding,
  selectStudyScheduleBuildingSearchString,
} from "@store/modules/study-schedule/sections/building/selector";
import { IBuildingEntity } from "@domain/entity/study-schedule";
import { useList } from "@app/hooks/useList";
import { BuildingItem } from "@app/pages/client/study-schedule/building/components/building-item/BuildingItem";

export const BuildingList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const building = useAppSelector(selectStudyScheduleBuilding);

  const {
    searchString,
    list: buildingList,
    pagination,
  } = useList<IBuildingEntity>({
    pagination: building.pagination,
    originalList: building.list,
    searchFields: ["name", "address"],
    selectSearchString: selectStudyScheduleBuildingSearchString,
  });

  if (building.loading === "loading") {
    return <CardListLoader />;
  }

  if (building.loading === "error") {
    return <RequestError />;
  }

  if (!buildingList.length) {
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
        title={t("app.features.study-schedule.building.emptyBuildingTitle")}
        description={t(
          "app.features.study-schedule.building.emptyBuildingDescription",
        )}
      />
    );
  }

  return (
    <ErrorBoundary>
      <StyledCardListWrapper>
        <StyledCardList
          pageStart={1}
          loadMore={(pageNumber): void => {
            dispatch(
              loadBuildingAction({
                page: pageNumber,
              }),
            );
          }}
          hasMore={
            building.loading === "still-loading"
              ? false
              : !pagination.isFinished
          }>
          {buildingList.map((item, index) => (
            <BuildingItem buildingItem={item} key={`Building_item_${index}`} />
          ))}

          {building.loading === "still-loading" && (
            <>
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </>
          )}
        </StyledCardList>
      </StyledCardListWrapper>
    </ErrorBoundary>
  );
};
