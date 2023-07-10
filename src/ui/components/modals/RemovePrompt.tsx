import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/components/button/Button";
import { BaseModal } from "@ui/components/modals/BaseModal";
import {
  StyledRemovePromptButtonGroup,
  StyledRemovePromptDeleteButton,
  StyledRemovePromptTitle,
} from "@ui/components/modals/styled";

interface RemovePromptProps {
  isOpen: boolean;
  headerTitle: string;
  removeTitle?: string;

  onRemoveComplete(event: React.MouseEvent<HTMLButtonElement>): void;

  onClose(): void;
}

export const RemovePrompt: React.FC<RemovePromptProps> = (props) => {
  const { t } = useTranslation();

  return (
    <BaseModal
      onRequestClose={props.onClose}
      isOpen={props.isOpen}
      headerTitle={props.headerTitle}
    >
      <StyledRemovePromptTitle>
        {props.removeTitle || t("app.modals.defaultRemoveMessage")}
      </StyledRemovePromptTitle>

      <StyledRemovePromptButtonGroup>
        <StyledRemovePromptDeleteButton
          isOutline={true}
          mode={"wide"}
          onClick={(event: React.MouseEvent<HTMLButtonElement>): void => {
            event.stopPropagation();

            props.onClose();
            props.onRemoveComplete(event);
          }}
        >
          {t("app.modals.delete")}
        </StyledRemovePromptDeleteButton>

        <Button mode={"wide"} onClick={props.onClose}>
          {t("app.modals.cancel")}
        </Button>
      </StyledRemovePromptButtonGroup>
    </BaseModal>
  );
};
