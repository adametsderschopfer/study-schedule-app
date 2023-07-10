import { DateTime } from "luxon";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  StyledContentBlockHeadTimerDate,
  StyledContentBlockHeadTimerTime,
  StyledContentBlockHeadTimerWrapper,
  StyledContentBlockHeadTitle,
  StyledContentBlockHeadWrapper,
} from "@ui/components/content-block-head/styled";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";

const parentLangPath = "app.pages.StudySchedule.ContentBlockHead";

interface IContentBlockHeadProps extends PropsWithChildren {
  titleLangVariable?: string | null;
  title?: string;

  isTimerEnable?: boolean;
  className?: string;
}

export const ContentBlockHead: React.FC<IContentBlockHeadProps> = (props) => {
  const { t } = useTranslation();
  const dateTime = DateTime.now();

  const [dateState, setDateState] = useState<Date>(new Date());

  useEffect(() => {
    if (props.isTimerEnable) {
      setInterval(() => setDateState(new Date()), 30000);
    }
  }, [props]);

  return (
    <ErrorBoundary>
      <StyledContentBlockHeadWrapper className={props.className}>
        {props.titleLangVariable || props.title ? (
          <StyledContentBlockHeadTitle isIndentRight={true}>
            {props.titleLangVariable ? t(props.titleLangVariable) : props.title}
          </StyledContentBlockHeadTitle>
        ) : null}

        {props.children}

        {props.isTimerEnable && (
          <StyledContentBlockHeadTimerWrapper>
            <StyledContentBlockHeadTimerDate>
              {t(`${parentLangPath}.today`)}: {dateTime.toLocaleString()}
            </StyledContentBlockHeadTimerDate>

            <StyledContentBlockHeadTimerTime>
              {t(`${parentLangPath}.time`)}:{" "}
              {dateState.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                // eslint-disable-next-line @typescript-eslint/naming-convention
                hour12: false,
              })}
            </StyledContentBlockHeadTimerTime>
          </StyledContentBlockHeadTimerWrapper>
        )}
      </StyledContentBlockHeadWrapper>
    </ErrorBoundary>
  );
};
