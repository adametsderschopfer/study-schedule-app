import React from "react";
import { StyledContentBlockHead } from "@app/pages/client/study-schedule/faculties/departments/teachers/components/teachers-header/styled";
import { TeachersHeaderAddButton } from "@app/pages/client/study-schedule/faculties/departments/teachers/components/teachers-header/teachers-header-add-button/TeachersHeaderAddButton";
import { TeachersHeaderSearchInput } from "@app/pages/client/study-schedule/faculties/departments/teachers/components/teachers-header/teachers-header-search-input/TeachersHeaderSearchInput";
import { TeachersHeaderSort } from "@app/pages/client/study-schedule/faculties/departments/teachers/components/teachers-header/teachers-header-sort/TeachersHeaderSort";

export const TeachersHeader: React.FC = () => {
  return (
    <StyledContentBlockHead>
      <TeachersHeaderSort />
      <TeachersHeaderSearchInput />
      <TeachersHeaderAddButton />
    </StyledContentBlockHead>
  );
};
