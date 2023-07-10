import React from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@store/hooks";
import { selectStudyScheduleFacultySubject } from "@store/modules/study-schedule/sections/faculties/sections/subject/selector";
import {
  StyledSubjectCounter,
  StyledSubjectCounterCount,
  StyledSubjectCounterText,
} from "@app/pages/client/study-schedule/faculties/departments/subject/components/subject-header/subject-header-counter/styled";

export const SubjectHeaderCounter: React.FC = () => {
  const { t } = useTranslation();
  const subject = useAppSelector(selectStudyScheduleFacultySubject);

  return (
    <StyledSubjectCounter>
      <StyledSubjectCounterText>
        {t("app.pages.StudySchedule.orgStructure.subject.counterText")}
      </StyledSubjectCounterText>

      <StyledSubjectCounterCount>
        {subject.list.length}
      </StyledSubjectCounterCount>
    </StyledSubjectCounter>
  );
};
