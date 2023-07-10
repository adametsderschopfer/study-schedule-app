import React from "react";
import { Breadcrumbs } from "@ui/components/breadcrumbs/Breadcrumbs";
import { StyledHeadTitleBreak } from "@ui/components/title/HeadTitle";
import { useAppSelector } from "@store/hooks";
import {
  selectGroupSchedule,
  selectGroupScheduleBreadcrumbs,
} from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/selector";
import { GroupScheduleHeaderAddButton } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-header/group-schedule-header-add-button/GroupScheduleHeaderAddButton";
import {
  StyledContentBlockHeadCol,
  StyledHeaderRow,
} from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-header/styled";

export const GroupScheduleHeader: React.FC = () => {
  const schedule = useAppSelector(selectGroupSchedule);
  const breadcrumbs = useAppSelector(selectGroupScheduleBreadcrumbs);

  return (
    <StyledContentBlockHeadCol>
      <Breadcrumbs crumbs={breadcrumbs} />

      <StyledHeaderRow>
        <StyledHeadTitleBreak>{schedule.detailGroup.name}</StyledHeadTitleBreak>

        <GroupScheduleHeaderAddButton />
      </StyledHeaderRow>
    </StyledContentBlockHeadCol>
  );
};
