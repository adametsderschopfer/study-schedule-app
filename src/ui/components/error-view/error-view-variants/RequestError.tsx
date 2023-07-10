import React from "react";
import { useTranslation } from "react-i18next";
import { ErrorView } from "@ui/components/error-view/ErrorView";

export const RequestError: React.FC<{ retry?(): void }> = (props) => {
  const { t } = useTranslation();

  return (
    <ErrorView
      type={"REQUEST_ERROR"}
      title={t("app.request.failedLoad")}
      description={t("app.errors.REQUEST_ERROR")}
      retry={props.retry}
    />
  );
};
