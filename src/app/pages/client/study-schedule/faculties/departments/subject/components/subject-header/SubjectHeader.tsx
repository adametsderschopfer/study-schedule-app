import React from "react";
import { ContentBlockHead } from "@ui/components/content-block-head/ContentBlockHead";
import { SubjectHeaderAddButton } from "@app/pages/client/study-schedule/faculties/departments/subject/components/subject-header/subject-header-add-button/SubjectHeaderAddButton";
import { SubjectHeaderCounter } from "@app/pages/client/study-schedule/faculties/departments/subject/components/subject-header/subject-header-counter/SubjectHeaderCounter";
import { SubjectHeaderSearchInput } from "@app/pages/client/study-schedule/faculties/departments/subject/components/subject-header/subject-header-search-input/SubjectHeaderSearchInput";

export const SubjectHeader: React.FC = () => {
  return (
    <ContentBlockHead>
      <SubjectHeaderCounter />
      <SubjectHeaderSearchInput />
      <SubjectHeaderAddButton />
    </ContentBlockHead>
  );
};
