import React from "react";
import { useTranslation } from "react-i18next";
import { useLinkClickHandler } from "react-router-dom";
import { Card } from "@ui/components/card/Card";
import { ItemError } from "@ui/components/error-view/error-view-variants/ItemError";
import { ErrorView } from "@ui/components/error-view/ErrorView";
import { RemoveButton } from "@ui/components/remove-button/RemoveButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { groupSlice } from "@store/modules/index";
import { selectDetailDepartmentInfo } from "@store/modules/study-schedule/sections/faculties/sections/department/selector";
import { deleteGroupAction } from "@store/modules/study-schedule/sections/faculties/sections/group/actions";
import {
  EStudyScheduleTypes,
  IGroupEntity,
} from "@domain/entity/study-schedule/index";

interface GroupItemProps {
  moduleType: EStudyScheduleTypes;
  item: IGroupEntity;
}

export const GroupItem: React.FC<GroupItemProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const cardLinkHandler = useLinkClickHandler(`schedule/${props.item.id}`);
  const departmentInfo = useAppSelector(selectDetailDepartmentInfo);

  const dropdownMenu = {
    items: [
      {
        name: t("app.dropdownMenu.remove"),
        component: RemoveButton,
        props: {
          headerTitle: t(
            "app.pages.StudySchedule.orgStructure.group.deleteGroupModalTitle",
          ),
          onRemoveComplete: () => dispatch(deleteGroupAction(props.item.id)),
        },
      },
      {
        name: t("app.dropdownMenu.edit"),
        props: {
          onClick(): void {
            dispatch(
              groupSlice.actions.setEditGroupFormShown({
                status: true,
                itemId: props.item.id,
              }),
            );
          },
        },
      },
    ],
  };

  switch (props.moduleType) {
    case EStudyScheduleTypes.UNIVERSITY: {
      if (!departmentInfo) {
        return <ItemError />;
      }

      const courseText = `${props.item.year_of_education} ${t(
        "app.store.study-schedule.YearsOfEducation",
      )}`;
      const levelText = `${t(
        `app.store.study-schedule.LevelsOfEducation.${props.item.degree}`,
      )}`;

      return (
        <Card
          headerTitle={props.item.name}
          text={`${courseText} / ${levelText}`}
          subText={departmentInfo.name}
          description={departmentInfo.department.name}
          onClick={cardLinkHandler}
          dropdownMenu={dropdownMenu}
        />
      );
    }

    case EStudyScheduleTypes.COLLEGE: {
      if (!departmentInfo) {
        return <ItemError />;
      }

      const courseText = `${props.item.year_of_education} ${t(
        "app.store.study-schedule.YearsOfEducation",
      )}`;
      const formText = `${t(
        `app.store.study-schedule.FormsOfEducation.${props.item.form_of_education}`,
      )}`;

      return (
        <Card
          headerTitle={props.item.name}
          text={`${courseText} / ${formText}`}
          description={departmentInfo.name}
          onClick={cardLinkHandler}
          dropdownMenu={dropdownMenu}
        />
      );
    }

    case EStudyScheduleTypes.SCHOOL: {
      const yearSchool = `${props.item.year_of_education} ${t(
        "app.store.study-schedule.YearsOfEducationSchool",
      )}`;

      return (
        <Card
          headerTitle={`${yearSchool} (${props.item.letter})`}
          text={props.item?.teacher?.full_name || "Нет учителя"}
          description={props.item.name}
          onClick={cardLinkHandler}
          dropdownMenu={dropdownMenu}
        />
      );
    }

    default:
      return <ErrorView title={"Unknown EStudyScheduleTypes moduleType..."} />;
  }
};
