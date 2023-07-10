import React from "react";
import { useTranslation } from "react-i18next";
import { ErrorView } from "@ui/components/error-view/ErrorView";

export const CodeError: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ErrorView
      type={"CODE_ERROR"}
      title={t("app.request.failedLoad")}
      description={t("app.errors.CODE_ERROR")}
    />
  );
};
