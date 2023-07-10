import React, { useEffect } from "react";
import { ContentBlockHead } from "@ui/components/content-block-head/ContentBlockHead";
import { useAppDispatch } from "@store/hooks";
import { loadBuildingAction } from "@store/modules/study-schedule/sections/building/actions";
import { BuildingAddButton } from "@app/pages/client/study-schedule/building/components/building-add-button/BuildingAddButton";
import { BuildingList } from "@app/pages/client/study-schedule/building/components/building-list/BuildingList";
import { BuildingModalAdd } from "@app/pages/client/study-schedule/building/components/building-modal/building-modal-add/BuildingModalAdd";
import { BuildingModalEdit } from "@app/pages/client/study-schedule/building/components/building-modal/building-modal-edit/BuildingModalEdit";
import { BuildingSearchInput } from "@app/pages/client/study-schedule/building/components/building-search-input/BuildingSearchInput";

export const BuildingPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      loadBuildingAction({
        page: 1,
      }),
    );
  }, [dispatch]);

  return (
    <>
      <ContentBlockHead
        titleLangVariable={"app.pages.StudySchedule.Building.HeadTitle"}>
        <BuildingSearchInput />
        <BuildingAddButton />
      </ContentBlockHead>

      <BuildingList />

      <BuildingModalAdd />
      <BuildingModalEdit />
    </>
  );
};
