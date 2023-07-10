import React from "react";
import { ContentBlockHead } from "@ui/components/content-block-head/ContentBlockHead";

export const ScheduleFilterHeader: React.FC = () => {
  return (
    <ContentBlockHead
      titleLangVariable={"app.pages.StudySchedule.schedule.headTitle"}
      isTimerEnable={true}
    />
  );
};
