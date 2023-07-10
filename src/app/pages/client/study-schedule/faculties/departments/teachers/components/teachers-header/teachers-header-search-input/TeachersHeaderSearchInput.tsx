import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { SearchIcon } from "@ui/components/icons/SearchIcon";
import { useAppSelector } from "@store/hooks";
import { teachersSlice } from "@store/modules/index";
import { selectStudyScheduleFacultyTeachers } from "@store/modules/study-schedule/sections/faculties/sections/teachers/selector";
import { StyledSearchInput } from "@app/pages/client/study-schedule/faculties/departments/teachers/components/teachers-header/teachers-header-search-input/styled";

export const TeachersHeaderSearchInput: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const teachers = useAppSelector(selectStudyScheduleFacultyTeachers);

  return (
    <StyledSearchInput
      isWide={true}
      onInput={(value: string): void => {
        dispatch(teachersSlice.actions.setSearchValue(value));
      }}
      placeholder={t("app.search.title")}
      value={teachers.searchValue}
      icon={<SearchIcon />}
    />
  );
};
