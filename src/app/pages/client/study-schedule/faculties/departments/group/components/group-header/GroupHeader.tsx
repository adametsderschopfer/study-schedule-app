import React from "react";
import { ContentBlockHead } from "@ui/components/content-block-head/ContentBlockHead";
import { GroupHeaderAddButton } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-header/group-header-add-button/GroupHeaderAddButton";
import { GroupHeaderFilter } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-header/group-header-filter/GroupHeaderFilter";
import { GroupHeaderSearchInput } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-header/group-header-search-input/GroupHeaderSearchInput";

export const GroupHeader: React.FC = () => {
  return (
    <ContentBlockHead>
      <GroupHeaderFilter />
      <GroupHeaderSearchInput />
      <GroupHeaderAddButton />
    </ContentBlockHead>
  );
};
