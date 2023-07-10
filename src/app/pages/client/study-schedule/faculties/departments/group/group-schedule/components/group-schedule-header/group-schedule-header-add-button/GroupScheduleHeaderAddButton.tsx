import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/components/button/Button";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { groupScheduleSlice } from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/slice";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";

export const GroupScheduleHeaderAddButton: React.FC = () => {
  const { type: moduleType } = useAppSelector(selectStudySchedule);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleOpenCreateModal = (): void => {
    dispatch(
      groupScheduleSlice.actions.setCreateModalShown({
        status: true,
        item: undefined,
        itemId: undefined,
      }),
    );
  };

  return (
    <Button onClick={handleOpenCreateModal}>
      {t(
        `app.pages.StudySchedule.orgStructure.schedule.addButton.${moduleType}`,
      )}
    </Button>
  );
};
