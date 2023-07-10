import React from "react";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "@ui/components/icons/SearchIcon";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { facultySlice } from "@store/modules/index";
import { selectStudyScheduleFaculty } from "@store/modules/study-schedule/sections/faculties/selector";
import { StyledInput } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-search-input/styled";

export const FacultiesSearchInput: React.FC = () => {
  const { t } = useTranslation();
  const facultyStore = useAppSelector(selectStudyScheduleFaculty);
  const dispatch = useAppDispatch();

  return (
    <StyledInput
      isWide={true}
      value={facultyStore.searchValue}
      icon={<SearchIcon />}
      onInput={(value: string): void => {
        dispatch(facultySlice.actions.setSearchValue(value));
      }}
      placeholder={t(
        "app.pages.StudySchedule.orgStructure.faculties.searchPlaceholder",
      )}
    />
  );
};
