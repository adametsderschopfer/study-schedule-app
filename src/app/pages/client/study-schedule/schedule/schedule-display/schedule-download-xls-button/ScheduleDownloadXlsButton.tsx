import React from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { downloadScheduleAsXLS } from "@store/modules/study-schedule/sections/schedule/actions";
import {
  selectSchedule,
  selectScheduleTable,
} from "@store/modules/study-schedule/sections/schedule/selector";
import { useDownloadFile } from "@app/hooks/useDownloadFile";
import { StyledDownloadXLS } from "@app/pages/client/study-schedule/schedule/schedule-display/schedule-download-xls-button/styled";

export const ScheduleDownloadXlsButton: React.FC = () => {
  const schedule = useAppSelector(selectSchedule);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const scheduleTable = useAppSelector(selectScheduleTable);

  const { download } = useDownloadFile({
    async apiDefinition() {
      const params = Object.fromEntries(searchParams.entries());

      return await dispatch(downloadScheduleAsXLS(params)).unwrap();
    },
    getFileName: () => `${new Date().toLocaleDateString()}.xls`,
  });

  if (scheduleTable.rows.length === 0) {
    return null;
  }

  return (
    <StyledDownloadXLS
      isLoading={schedule.xlsLoading === "loading"}
      isOutline={true}
      onClick={download}>
      {t("app.pages.StudySchedule.schedule.downloadXLS")}
    </StyledDownloadXLS>
  );
};
