import React from "react";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { StyledContainerLargeLeft } from "@ui/components/layout/Container";
import { SidebarMenu } from "@ui/components/sidebar/sidebar-menu/SidebarMenu";
import {
  StyledSidebarContainer,
  StyledSidebarContent,
  StyledSidebarSubTitle,
  StyledSidebarTitle,
} from "@ui/components/sidebar/styled";
import { useAppSelector } from "@store/hooks";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { selectUser } from "@store/modules/user/selector";
import { getStudyScheduleTypeName } from "@domain/entity/study-schedule/data";

export const Sidebar: React.FC = () => {
  const { data } = useAppSelector(selectUser);
  const studySchedule = useAppSelector(selectStudySchedule);

  return (
    <StyledSidebarContainer>
      <StyledSidebarContent>
        <StyledContainerLargeLeft>
          <StyledSidebarTitle>{data.name || "Study schedule"}</StyledSidebarTitle>

          {data.isStudyScheduleEnabled && (
            <StyledSidebarSubTitle>
              {getStudyScheduleTypeName(studySchedule.type)}
            </StyledSidebarSubTitle>
          )}
        </StyledContainerLargeLeft>

        <ErrorBoundary>
          <SidebarMenu />
        </ErrorBoundary>
      </StyledSidebarContent>
    </StyledSidebarContainer>
  );
};
