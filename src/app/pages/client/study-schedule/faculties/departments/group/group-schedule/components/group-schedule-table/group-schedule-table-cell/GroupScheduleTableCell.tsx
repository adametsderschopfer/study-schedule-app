import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClickAwayListener } from "@ui/components/click-away-listener/ClickAwayListener";
import { CellParams } from "@ui/components/study-schedule/schedule-table/ScheduleTable";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { groupScheduleSlice } from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/slice";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { EStudyScheduleTypes } from "@domain/entity/study-schedule/index";
import { GroupScheduleTableCellDetail } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-table/group-schedule-table-cell/group-schedule-table-cell-detail/GroupScheduleTableCellDetail";
import {
  StyledScheduleCellItem,
  StyledScheduleCellItemName,
  StyledScheduleCellItemSubgroup,
  StyledScheduleCellItemWrapper,
  StyledScheduleCellNew,
  StyledScheduleCellNewCircle,
} from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-table/group-schedule-table-cell/styled";

export const GroupScheduleTableCell: React.FC<CellParams> = (props) => {
  const [isDetailShown, setDetailShown] = useState<boolean>(false);

  const { type: moduleType } = useAppSelector(selectStudySchedule);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const handleDocumentScroll = (): void => {
      setDetailShown(false);
    };

    document.addEventListener("wheel", handleDocumentScroll);
    return () => document.removeEventListener("wheel", handleDocumentScroll);
  }, []);

  if (props.scheduleItem === null) {
    return (
      <StyledScheduleCellNew
        onClick={(): void => {
          dispatch(
            groupScheduleSlice.actions.setCreateModalShown({
              status: true,
              item: {
                schedule_setting_id: props.row.info.schedule_setting_id,
                schedule_setting_item_order: props.row.info.order - 1,
                day_of_week: props.date.weekday,
              },
            }),
          );
        }}>
        <StyledScheduleCellNewCircle />
      </StyledScheduleCellNew>
    );
  }

  return (
    <ClickAwayListener
      onClickAway={(): void => {
        setDetailShown(false);
      }}>
      <StyledScheduleCellItemWrapper>
        <GroupScheduleTableCellDetail
          isShown={isDetailShown}
          scheduleItem={props.scheduleItem}
          date={props.date}
        />

        <StyledScheduleCellItem
          isCenter={moduleType === EStudyScheduleTypes.SCHOOL}
          onClick={(): void => {
            setDetailShown(!isDetailShown);
          }}>
          {moduleType !== EStudyScheduleTypes.SCHOOL ? (
            <StyledScheduleCellItemSubgroup>
              {props.scheduleItem.sub_group == 0
                ? t("app.store.study-schedule.SubGroups_common")
                : `${props.scheduleItem.sub_group} ${t(
                    "app.store.study-schedule.SubGroups_1",
                  )}`}
            </StyledScheduleCellItemSubgroup>
          ) : null}

          <StyledScheduleCellItemName>
            {props.scheduleItem.subject?.name || "Предмет не задан"}
          </StyledScheduleCellItemName>
        </StyledScheduleCellItem>
      </StyledScheduleCellItemWrapper>
    </ClickAwayListener>
  );
};
