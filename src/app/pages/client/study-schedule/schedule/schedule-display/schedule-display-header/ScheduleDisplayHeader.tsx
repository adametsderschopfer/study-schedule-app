import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@ui/components/button/Button";
import { ContentBlockHead } from "@ui/components/content-block-head/ContentBlockHead";
import {
  StyledHeaderButtonGroup,
  StyledHeaderTitle,
} from "@app/pages/client/study-schedule/schedule/schedule-display/schedule-display-header/styled";
import { ScheduleDownloadXlsButton } from "@app/pages/client/study-schedule/schedule/schedule-display/schedule-download-xls-button/ScheduleDownloadXlsButton";

export const ScheduleDisplayHeader: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  return (
    <ContentBlockHead>
      <StyledHeaderTitle>
        {t("app.pages.StudySchedule.schedule.scheduleTitle")} /&nbsp;
        {params.date_start}
        {`${
          params.date_start !== params.date_end ? " - " + params.date_end : ""
        }`}
      </StyledHeaderTitle>

      <StyledHeaderButtonGroup>
        <ScheduleDownloadXlsButton />

        <Button
          onClick={(): void => {
            navigate("/client/study-schedule/schedule");
          }}>
          {t("app.pages.StudySchedule.schedule.backToTheScheduleFilter")}
        </Button>
      </StyledHeaderButtonGroup>
    </ContentBlockHead>
  );
};
