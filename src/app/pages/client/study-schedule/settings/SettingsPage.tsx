import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ContentBlockHead } from "@ui/components/content-block-head/ContentBlockHead";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { RequestError } from "@ui/components/error-view/error-view-variants/RequestError";
import { ExplanationBlock } from "@ui/components/explanation/Explanation";
import { PageLoader } from "@ui/components/page-loader/PageLoader";
import {
  StyledContentExplanationWrapper,
  StyledModesLessonsWrapper,
  StyledModesWrapper,
  StyledSettingsWrapperGroup,
} from "@ui/components/study-schedule/settings/styled";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { onPageStartAction } from "@store/modules/study-schedule/sections/settings/actions";
import { selectStudyScheduleSettings } from "@store/modules/study-schedule/sections/settings/selector";
import { SettingsModesAddButton } from "@app/pages/client/study-schedule/settings/components/settings-modes/settings-modes-add-button/SettingsModesAddButton";
import { SettingsModesLessons } from "@app/pages/client/study-schedule/settings/components/settings-modes/settings-modes-lessons/SettingsModesLessons";
import { SettingsModesModalCreator } from "@app/pages/client/study-schedule/settings/components/settings-modes/settings-modes-modal/settings-modes-modal-creator/SettingsModesModalCreator";
import { SettingsModes } from "@app/pages/client/study-schedule/settings/components/settings-modes/SettingsModes";

export const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const settings = useAppSelector(selectStudyScheduleSettings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onPageStartAction());
  }, [dispatch]);

  return (
    <>
      <ContentBlockHead
        titleLangVariable={"app.pages.StudySchedule.Settings.HeadTitle"}>
        <SettingsModesAddButton />
      </ContentBlockHead>

      {settings.loading === "loading" ? (
        <PageLoader />
      ) : settings.loading === "error" ? (
        <RequestError />
      ) : (
        <StyledSettingsWrapperGroup>
          <StyledContentExplanationWrapper>
            <ExplanationBlock
              isVertical={true}
              steps={Array.from(Array(3)).map((_, index) => ({
                title: t(
                  `app.pages.StudySchedule.Settings.explanationSteps.step_${
                    index + 1
                  }.title`,
                ),
                description: t(
                  `app.pages.StudySchedule.Settings.explanationSteps.step_${
                    index + 1
                  }.description`,
                ),
              }))}
            />
          </StyledContentExplanationWrapper>

          {settings.modes.length ? (
            <StyledModesLessonsWrapper>
              <ErrorBoundary>
                <SettingsModesLessons />
              </ErrorBoundary>
            </StyledModesLessonsWrapper>
          ) : null}

          <StyledModesWrapper>
            <ErrorBoundary>
              <SettingsModes />
            </ErrorBoundary>
          </StyledModesWrapper>

          <SettingsModesModalCreator />
        </StyledSettingsWrapperGroup>
      )}
    </>
  );
};
