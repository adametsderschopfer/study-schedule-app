import { LStorage } from "@utils/LStorage";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/components/button/Button";
import {
  StyledScheduleTableNotify,
  StyledScheduleTableNotifyText,
} from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-body/styled";

const LS_SHOWN_TABLE_NOTIFY = "@SHOWN_TABLE_NOTIFY";

export const GroupScheduleTableNotify: React.FC = () => {
  const { t } = useTranslation();
  const [isShownStatus, setShownStatus] = useState<boolean>(false);

  useEffect(() => {
    initShown();
  }, []);

  const initShown = async (): Promise<void> => {
    const isShownTableNotify = await LStorage.getItem<string>(
      LS_SHOWN_TABLE_NOTIFY,
    );

    setShownStatus(!(isShownTableNotify === "false"));
  };

  const handleClick = (): void => {
    setShownStatus(false);
    LStorage.setItem(LS_SHOWN_TABLE_NOTIFY, "false");
  };

  if (!isShownStatus) {
    return null;
  }

  return (
    <StyledScheduleTableNotify>
      <StyledScheduleTableNotifyText>
        {t("app.pages.StudySchedule.orgStructure.schedule.tableNotify")}
      </StyledScheduleTableNotifyText>

      <Button mode={"wide"} onClick={handleClick}>
        Ok
      </Button>
    </StyledScheduleTableNotify>
  );
};
