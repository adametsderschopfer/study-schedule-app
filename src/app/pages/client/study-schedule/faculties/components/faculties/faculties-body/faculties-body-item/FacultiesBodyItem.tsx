import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RemoveButton } from "@ui/components/remove-button/RemoveButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { facultySlice } from "@store/modules/index";
import {
  deleteDepartmentAction,
  deleteFacultyAction,
} from "@store/modules/study-schedule/sections/faculties/actions";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import {
  EStudyScheduleTypes,
  IDepartmentEntity,
  IFacultyEntity,
} from "@domain/entity/study-schedule";
import { StyledEntityPicker } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-body/styled";

export const FacultiesBodyItem: React.FC<IDepartmentEntity | IFacultyEntity> = (
  props,
) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { type: moduleType } = useAppSelector(selectStudySchedule);
  const isCollege = moduleType === EStudyScheduleTypes.COLLEGE;

  const entityDropdownProps = {
    items: [
      {
        name: t("app.dropdownMenu.remove"),
        component: RemoveButton,
        props: {
          headerTitle: t(
            `app.pages.StudySchedule.orgStructure.faculties.deleteFaculty.${moduleType}`,
          ),
          onRemoveComplete: () => dispatch(deleteFacultyAction(props.id)),
        },
      },
      {
        name: t("app.dropdownMenu.edit"),
        props: {
          onClick(): void {
            dispatch(
              facultySlice.actions.setEditFacultyModalShown({
                status: true,
                itemId: props.id,
              }),
            );
          },
        },
      },
    ],
  };

  return (
    <StyledEntityPicker
      title={props.name}
      onClick={(): void => {
        navigate(`/client/study-schedule/faculties/${props.id}/detail/`);
      }}
      entityAction={(item: IDepartmentEntity): void => {
        navigate(`/client/study-schedule/faculties/${props.id}/${item.id}`);
      }}
      useInline={isCollege}
      items={
        !("departments" in props)
          ? undefined
          : props.departments.map((item) => ({
              ...item,
              dropdownMenu: {
                items: [
                  {
                    name: t("app.dropdownMenu.remove"),
                    component: RemoveButton,
                    props: {
                      headerTitle: t(
                        "app.pages.StudySchedule.orgStructure.faculties.deleteDepartment",
                      ),
                      onRemoveComplete: (): void => {
                        dispatch(deleteDepartmentAction(item.id));
                      },
                    },
                  },
                  {
                    name: t("app.dropdownMenu.edit"),
                    props: {
                      onClick(): void {
                        dispatch(
                          facultySlice.actions.setEditDepartmentModalShown({
                            status: true,
                            itemId: item.id,
                            facultyId: item.faculty_id,
                          }),
                        );
                      },
                    },
                  },
                ],
              },
            }))
      }
      dropdownMenu={entityDropdownProps}
      addAction={{
        name: t(
          "app.pages.StudySchedule.orgStructure.faculties.addDepartmentButton",
        ),
        onAddClick(): void {
          dispatch(
            facultySlice.actions.setCreateDepartmentModalShown({
              status: true,
              facultyId: props.id,
            }),
          );
        },
      }}
    />
  );
};
