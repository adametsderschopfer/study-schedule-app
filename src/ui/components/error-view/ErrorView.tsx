import React from "react";
import { useTranslation } from "react-i18next";
import {
  StyledErrorViewDescription,
  StyledErrorViewHead,
  StyledErrorViewIcon,
  StyledErrorViewTitle,
  StyledErrorViewType,
  StyledErrorViewWrapper,
  StyledRetryButton,
} from "@ui/components/error-view/styled";

interface ErrorViewProps {
  title?: string | undefined | null;
  description?: string | undefined | null;
  type?: string;
  retry?(): void;
}

export const ErrorView: React.FC<ErrorViewProps> = (props) => {
  const { t } = useTranslation();

  return (
    <StyledErrorViewWrapper>
      <StyledErrorViewHead>
        <StyledErrorViewIcon>
          <svg
            width={"25"}
            height={"27"}
            viewBox={"0 0 25 27"}
            fill={"none"}
            xmlns={"http://www.w3.org/2000/svg"}>
            <path
              d={
                "M13.6047 15.6738L16.9188 12.2907L15.8141 11.163L12.5016 14.5461L9.18594 11.1646L8.08125 12.2907L11.3953 15.6738L8.08281 19.0553L9.18594 20.1846L12.5 16.8015L15.8141 20.1846L16.9188 19.0569L13.6063 15.6738H13.6047ZM17.1875 5.306H21.0938V23.6491H3.90625V5.306H7.8125V6.90105H17.1875V5.306ZM9.375 5.306V2.91342H15.625V5.306H9.375Z"
              }
              fill={"#D93A3A"}
            />
          </svg>
        </StyledErrorViewIcon>

        {props.type && <StyledErrorViewType>{props.type}</StyledErrorViewType>}
      </StyledErrorViewHead>

      <StyledErrorViewTitle>
        {props.title || t("app.request.failedLoad")}
      </StyledErrorViewTitle>

      {props.description && (
        <StyledErrorViewDescription>
          {props.description}
        </StyledErrorViewDescription>
      )}

      {props.retry && (
        <StyledRetryButton onClick={props.retry} isOutline={true}>
          {t("app.errors.RETRY")}
        </StyledRetryButton>
      )}
    </StyledErrorViewWrapper>
  );
};
