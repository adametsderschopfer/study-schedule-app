import React from "react";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "@ui/components/icons/SearchIcon";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { groupSlice } from "@store/modules/index";
import { selectStudyScheduleDepartmentGroup } from "@store/modules/study-schedule/sections/faculties/sections/group/selector";
import { StyledSearchInput } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-header/group-header-search-input/styled";

export const GroupHeaderSearchInput: React.FC = () => {
  const { t } = useTranslation();
  const group = useAppSelector(selectStudyScheduleDepartmentGroup);
  const dispatch = useAppDispatch();

  return (
    <StyledSearchInput
      isWide={true}
      onInput={(value: string): void => {
        dispatch(groupSlice.actions.setSearchValue(value));
      }}
      placeholder={t("app.search.title")}
      value={group.searchValue || ""}
      icon={<SearchIcon />}
    />
  );
};
