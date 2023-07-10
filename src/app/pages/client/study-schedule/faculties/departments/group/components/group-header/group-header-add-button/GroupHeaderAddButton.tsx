import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { groupSlice } from "@store/modules/index";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { StyledGroupHeaderAddButton } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-header/group-header-add-button/styled";

export const GroupHeaderAddButton: React.FC = () => {
  const { t } = useTranslation();
  const { type } = useAppSelector(selectStudySchedule);
  const dispatch = useAppDispatch();

  return (
    <StyledGroupHeaderAddButton
      onClick={(): void => {
        dispatch(groupSlice.actions.setCreateGroupFormShown(true));
      }}
    >
      {t(`app.pages.StudySchedule.orgStructure.group.addGroupButton.${type}`)}
    </StyledGroupHeaderAddButton>
  );
};
