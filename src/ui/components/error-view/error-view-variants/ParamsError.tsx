import React from "react";
import { useTranslation } from "react-i18next";
import { ErrorView } from "@ui/components/error-view/ErrorView";

export const ParamsError: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ErrorView
      type={"PARAMS_ERROR"}
      title={t("app.request.failedLoad")}
      description={t("app.errors.PARAMS_ERROR")}
    />
  );
};
