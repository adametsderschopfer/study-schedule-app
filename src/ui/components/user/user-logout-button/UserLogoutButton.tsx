import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/components/button/Button";
import { useAppDispatch } from "@store/hooks";
import { logoutAction } from "@store/modules/user/actions";

export const UserLogoutButton: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={(): void => {
        dispatch(logoutAction());
      }}
    >
      {t("app.features.user.user-logout-button.exit")}
    </Button>
  );
};
