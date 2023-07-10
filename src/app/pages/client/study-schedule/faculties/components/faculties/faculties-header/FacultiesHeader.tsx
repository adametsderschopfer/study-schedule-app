import React from "react";
import { useTranslation } from "react-i18next";
import { ContentBlockHead } from "@ui/components/content-block-head/ContentBlockHead";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { facultySlice } from "@store/modules/index";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { StyledCreateFacultiesButton } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-header/styled";
import { FacultiesSearchInput } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-search-input/FacultiesSearchInput";

export const FacultiesHeader: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { type: moduleType } = useAppSelector(selectStudySchedule);

  return (
    <ContentBlockHead
      titleLangVariable={`app.pages.StudySchedule.orgStructure.faculties.headTitle.${moduleType}`}
    >
      <FacultiesSearchInput />

      <StyledCreateFacultiesButton
        onClick={(): void => {
          dispatch(
            facultySlice.actions.setCreateFacultyModalShown({ status: true }),
          );
        }}
      >
        {t(
          `app.pages.StudySchedule.orgStructure.faculties.createFaculties.${moduleType}`,
        )}
      </StyledCreateFacultiesButton>
    </ContentBlockHead>
  );
};
