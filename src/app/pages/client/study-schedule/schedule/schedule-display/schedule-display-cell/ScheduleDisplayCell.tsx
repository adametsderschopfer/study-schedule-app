import React from "react";
import { useTranslation } from "react-i18next";
import { StyledErrorText } from "@ui/components/error-message/styled";
import { CellParams } from "@ui/components/study-schedule/schedule-table/ScheduleTable";
import { useAppSelector } from "@store/hooks";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { getScheduleTypeName } from "@domain/entity/study-schedule/data";
import { EStudyScheduleTypes } from "@domain/entity/study-schedule/index";
import {
  StyledScheduleDisplayCell,
  StyledScheduleDisplayCellLectureText,
  StyledScheduleDisplayCellLectureTitle,
  StyledScheduleDisplayCellRow,
  StyledScheduleDisplayCellRowText,
  StyledScheduleDisplayCellText,
} from "@app/pages/client/study-schedule/schedule/schedule-display/schedule-display-cell/styled";

export const ScheduleDisplayCell: React.FC<CellParams> = (props) => {
  const { t } = useTranslation();
  const { type: moduleType } = useAppSelector(selectStudySchedule);

  if (!props.scheduleItem) {
    return <></>;
  }

  if (moduleType === EStudyScheduleTypes.SCHOOL) {
    return (
      <StyledScheduleDisplayCell>
        <StyledScheduleDisplayCellLectureText>
          {props.scheduleItem.subject?.name}
        </StyledScheduleDisplayCellLectureText>

        <StyledScheduleDisplayCellText>
          {`${props.scheduleItem.building_classroom?.name || "???"} (${
            props.scheduleItem.building?.address
          })`}
        </StyledScheduleDisplayCellText>

        <StyledScheduleDisplayCellText>
          {props.scheduleItem.teacher?.full_name}
        </StyledScheduleDisplayCellText>

        <StyledScheduleDisplayCellText>
          {`${props.scheduleItem.group.year_of_education} ${props.scheduleItem.group.letter}`}
        </StyledScheduleDisplayCellText>
      </StyledScheduleDisplayCell>
    );
  }

  return (
    <StyledScheduleDisplayCell>
      <StyledScheduleDisplayCellLectureTitle>
        {getScheduleTypeName(props.scheduleItem.type)}:
      </StyledScheduleDisplayCellLectureTitle>

      <StyledScheduleDisplayCellLectureText>
        {props.scheduleItem.subject?.name}
      </StyledScheduleDisplayCellLectureText>

      <StyledScheduleDisplayCellText>
        {props.scheduleItem.building_classroom?.name || (
          <StyledErrorText>
            {t(`app.problemMessages.notSet`, {
              form: "а",
            })}
          </StyledErrorText>
        )}
        {`${
          props.scheduleItem.building?.address
            ? `(${props.scheduleItem.building?.address})`
            : ""
        }`}
      </StyledScheduleDisplayCellText>

      <StyledScheduleDisplayCellText>
        {props.scheduleItem.teacher?.full_name}
      </StyledScheduleDisplayCellText>

      <StyledScheduleDisplayCellRow>
        <StyledScheduleDisplayCellRowText>
          {props.scheduleItem.group?.name}
        </StyledScheduleDisplayCellRowText>
        <StyledScheduleDisplayCellRowText>
          {props.scheduleItem.sub_group == 0
            ? t("app.store.study-schedule.SubGroups_common")
            : `${props.scheduleItem.sub_group} ${t(
                "app.store.study-schedule.SubGroups_1",
              )}`}
        </StyledScheduleDisplayCellRowText>
      </StyledScheduleDisplayCellRow>
    </StyledScheduleDisplayCell>
  );
};
