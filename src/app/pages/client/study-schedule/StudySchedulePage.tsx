import React from "react";
import { useTranslation } from "react-i18next";
import { ExplanationBlock } from "@ui/components/explanation/Explanation";
import { StyledContentBlock } from "@ui/components/layout/ContentBlock";
import { StudyScheduleSubtitle } from "@ui/components/study-schedule/styled";
import { StyledHeadTitle } from "@ui/components/title/HeadTitle";
import { useAppSelector } from "@store/hooks";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";

const parentTransString = "app.pages.StudySchedule.Home";

export const StudySchedulePage: React.FC = () => {
  const { t } = useTranslation();
  const studySchedule = useAppSelector(selectStudySchedule);

  return (
    <StyledContentBlock>
      <StyledHeadTitle>{t(`${parentTransString}.title`)}</StyledHeadTitle>
      <StudyScheduleSubtitle>
        {t(`${parentTransString}.subtitle`)}
      </StudyScheduleSubtitle>

      <ExplanationBlock
        steps={Array.from(Array(5)).map((_, index) => ({
          title: t(
            `${parentTransString}.explanationSteps.step_${index + 1}.${
              studySchedule.type
            }.title`,
          ),
          description: t(
            `${parentTransString}.explanationSteps.step_${index + 1}.${
              studySchedule.type
            }.description`,
          ),
        }))}
      />
    </StyledContentBlock>
  );
};
