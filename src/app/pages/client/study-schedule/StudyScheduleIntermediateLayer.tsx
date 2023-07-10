import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { RequestError } from "@ui/components/error-view/error-view-variants/RequestError";
import { PageLoader } from "@ui/components/page-loader/PageLoader";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { loadStudyScheduleUserDataAction } from "@store/modules/study-schedule/actions";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";

export const StudyScheduleIntermediateLayer: React.FC = () => {
  const { t } = useTranslation();
  const studySchedule = useAppSelector(selectStudySchedule);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadStudyScheduleUserDataAction());
  }, []);

  if (studySchedule.loading === "loading") {
    return <PageLoader text={t("app.loading.studyScheduleLoading")} />;
  }

  if (studySchedule.loading === "error") {
    return <RequestError />;
  }

  return <Outlet />;
};
