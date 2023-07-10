import React from "react";
import { useTranslation } from "react-i18next";
import { ErrorView } from "@ui/components/error-view/ErrorView";

export const ItemError: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ErrorView
      type={"RENDER_ITEM_ERROR"}
      title={t("app.errors.ITEM_ERROR.TITLE")}
      description={t("app.errors.ITEM_ERROR.DESCRIPTION")}
    />
  );
};
