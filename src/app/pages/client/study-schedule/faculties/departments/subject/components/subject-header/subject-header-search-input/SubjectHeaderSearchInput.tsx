import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { SearchIcon } from "@ui/components/icons/SearchIcon";
import { useAppSelector } from "@store/hooks";
import { subjectSlice } from "@store/modules/index";
import { selectStudyScheduleFacultySubject } from "@store/modules/study-schedule/sections/faculties/sections/subject/selector";
import { StyledSearchInput } from "@app/pages/client/study-schedule/faculties/departments/subject/components/subject-header/subject-header-search-input/styled";

export const SubjectHeaderSearchInput: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const subject = useAppSelector(selectStudyScheduleFacultySubject);

  return (
    <StyledSearchInput
      isWide={true}
      onInput={(value: string): void => {
        dispatch(subjectSlice.actions.setSearchValue(value));
      }}
      placeholder={t("app.search.title")}
      value={subject.searchValue}
      icon={<SearchIcon />}
    />
  );
};
