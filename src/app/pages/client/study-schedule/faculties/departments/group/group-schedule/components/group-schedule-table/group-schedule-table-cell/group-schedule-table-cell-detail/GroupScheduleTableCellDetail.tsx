import { theme } from "@config/theme";
import { DateTime } from "luxon";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { DropdownMenu } from "@ui/components/dropdown-menu/DropdownMenu";
import { StyledErrorText } from "@ui/components/error-message/styled";
import { RemoveButton } from "@ui/components/remove-button/RemoveButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  deleteScheduleAction,
  duplicateScheduleAction,
  loadSchedulesAction,
} from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/actions";
import { selectGroupSchedule } from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/selector";
import { groupScheduleSlice } from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/slice";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { getScheduleTypeName } from "@domain/entity/study-schedule/data";
import {
  EStudyScheduleTypes,
  IScheduleItem,
} from "@domain/entity/study-schedule/index";
import {
  StyledScheduleCellDetail,
  StyledScheduleCellDetailBody,
  StyledScheduleCellDetailBodyField,
  StyledScheduleCellDetailBodyLecture,
  StyledScheduleCellDetailContainer,
  StyledScheduleCellDetailHead,
  StyledScheduleCellDetailHeadDate,
  StyledScheduleCellDetailHeadDropdown,
  StyledScheduleCellDetailHeadTime,
} from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-table/group-schedule-table-cell/group-schedule-table-cell-detail/styled";

type GroupScheduleTableCellDetailProps = {
  isShown: boolean;
  scheduleItem: IScheduleItem;
  date: DateTime;
};

export const GroupScheduleTableCellDetail: React.FC<
  GroupScheduleTableCellDetailProps
> = (props) => {
  const dispatch = useAppDispatch();
  const { type } = useAppSelector(selectStudySchedule);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const schedule = useAppSelector(selectGroupSchedule);
  const params = useParams();

  const settingItem = props.scheduleItem.schedule_setting_item;

  const items = [
    {
      name: t("app.dropdownMenu.remove"),
      component: RemoveButton,
      props: {
        headerTitle: t(
          `app.pages.StudySchedule.orgStructure.schedule.removeTitle.${type}`,
        ),
        onRemoveComplete(): void {
          dispatch(deleteScheduleAction(props.scheduleItem.id));
        },
      },
    },
    {
      name: t("app.dropdownMenu.edit"),
      props: {
        onClick(): void {
          dispatch(
            groupScheduleSlice.actions.setEditModalShown({
              status: true,
              itemId: props.scheduleItem.id,
            }),
          );
        },
      },
    },
    {
      name: t("app.dropdownMenu.duplicate"),
      props: {
        async onClick(): Promise<void> {
          await dispatch(duplicateScheduleAction(props.scheduleItem.id));
          dispatch(
            loadSchedulesAction({
              date_start: schedule.dateStart,
              date_end: schedule.dateEnd,
              group_id: params.scheduleId,
              department_id: params.departmentId,
            }),
          );
        },
      },
    },
  ];

  if (!props.isShown) {
    return null;
  }

  return (
    <StyledScheduleCellDetail>
      <StyledScheduleCellDetailContainer>
        <StyledScheduleCellDetailHead>
          <StyledScheduleCellDetailHeadDate>
            {props.date.toFormat("ccc", { locale: language })}
            {`, ${props.date.toFormat("dd", {
              locale: language,
            })} ${props.date.toFormat("LLLL", { locale: language })}`}
          </StyledScheduleCellDetailHeadDate>

          <StyledScheduleCellDetailHeadTime>
            {`${props.scheduleItem.schedule_setting_item_order + 1} ${t(
              `app.pages.StudySchedule.orgStructure.schedule.lesson.${type}`,
            )} ${settingItem?.length ? settingItem[0]?.time_start : "--:--"}–${
              settingItem?.length ? settingItem[0]?.time_end : "--:--"
            }`}
          </StyledScheduleCellDetailHeadTime>

          <StyledScheduleCellDetailHeadDropdown>
            <DropdownMenu
              items={items}
              position={"bottom-left"}
              triggerBg={"#ffffff"}
              triggerSpanBgHover={theme.colors.primary}
              triggerSpanBg={"#ffffff"}
            />
          </StyledScheduleCellDetailHeadDropdown>
        </StyledScheduleCellDetailHead>

        <StyledScheduleCellDetailBody>
          {type !== EStudyScheduleTypes.SCHOOL ? (
            <StyledScheduleCellDetailBodyField>
              {getScheduleTypeName(props.scheduleItem.type)}:
            </StyledScheduleCellDetailBodyField>
          ) : null}
          <StyledScheduleCellDetailBodyLecture>
            {props.scheduleItem.subject?.name || "Ошибка - Предмет не задан"}
          </StyledScheduleCellDetailBodyLecture>

          <StyledScheduleCellDetailBodyField>
            {t(
              `app.pages.StudySchedule.orgStructure.schedule.fieldClassroomTitle.${type}`,
            )}
            :&nbsp;
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
          </StyledScheduleCellDetailBodyField>
          <StyledScheduleCellDetailBodyField>
            {`${t(
              `app.pages.StudySchedule.orgStructure.schedule.fieldTeacherTitle`,
            )}: ${props.scheduleItem.teacher?.full_name || "Не задан"}`}
          </StyledScheduleCellDetailBodyField>
          {type !== EStudyScheduleTypes.SCHOOL ? (
            <StyledScheduleCellDetailBodyField>
              {`${t(`app.pages.StudySchedule.schedule.groupFieldTitle`)}: ${
                props.scheduleItem.group?.name || "Не задана"
              }`}
            </StyledScheduleCellDetailBodyField>
          ) : (
            <StyledScheduleCellDetailBodyField>
              {`${t(
                `app.pages.StudySchedule.orgStructure.group.createGroup.schoolClassroomFieldTitle`,
              )}: ${
                props.scheduleItem.group?.year_of_education
              } ${props.scheduleItem.group?.letter?.toUpperCase()}`}
            </StyledScheduleCellDetailBodyField>
          )}

          {type !== EStudyScheduleTypes.SCHOOL ? (
            <StyledScheduleCellDetailBodyField>
              {`${t(
                `app.pages.StudySchedule.orgStructure.schedule.fieldSubgroupTitle`,
              )}: ${
                props.scheduleItem.sub_group === 0
                  ? t("app.store.study-schedule.SubGroups_common")
                  : `${props.scheduleItem.sub_group} ${t(
                      "app.store.study-schedule.SubGroups_1",
                    )}`
              }`}
            </StyledScheduleCellDetailBodyField>
          ) : null}
        </StyledScheduleCellDetailBody>
      </StyledScheduleCellDetailContainer>
    </StyledScheduleCellDetail>
  );
};
