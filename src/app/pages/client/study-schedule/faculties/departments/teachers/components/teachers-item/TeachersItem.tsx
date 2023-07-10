import React from "react";
import { useTranslation } from "react-i18next";
import { DropdownMenu } from "@ui/components/dropdown-menu/DropdownMenu";
import { RemoveButton } from "@ui/components/remove-button/RemoveButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { teachersSlice } from "@store/modules/index";
import { deleteTeacherAction } from "@store/modules/study-schedule/sections/faculties/sections/teachers/actions";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { ITeacherEntity } from "@domain/entity/study-schedule/index";
import {
  StyledTeacherItem,
  StyledTeacherItemDropdownMenu,
  StyledTeacherItemLine,
  StyledTeacherItemLineElement,
  StyledTeacherItemLineElementPrimary,
} from "@app/pages/client/study-schedule/faculties/departments/teachers/components/teachers-item/styled";

type TeachersItemProps = ITeacherEntity & {
  isLastItem?: boolean;
};

export const TeachersItem: React.FC<TeachersItemProps> = (props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { type } = useAppSelector(selectStudySchedule);

  return (
    <StyledTeacherItem>
      <StyledTeacherItemLine>
        <StyledTeacherItemLineElement>
          {props.full_name}
        </StyledTeacherItemLineElement>
        <StyledTeacherItemLineElementPrimary>
          {props?.position || ""}
        </StyledTeacherItemLineElementPrimary>
        <StyledTeacherItemLineElement>
          {props.degree}
        </StyledTeacherItemLineElement>
      </StyledTeacherItemLine>

      <StyledTeacherItemDropdownMenu>
        <DropdownMenu
          position={props.isLastItem ? "top-left" : "bottom-left"}
          items={[
            {
              name: t("app.dropdownMenu.remove"),
              component: RemoveButton,
              props: {
                headerTitle: t(
                  `app.pages.StudySchedule.orgStructure.teachers.removeModalTitle.${type}`,
                ),
                onRemoveComplete(): void {
                  dispatch(deleteTeacherAction(props.id));
                },
              },
            },
            {
              name: t("app.dropdownMenu.edit"),
              props: {
                onClick(): void {
                  dispatch(
                    teachersSlice.actions.setEditTeacherFormShown({
                      status: true,
                      itemId: props.id,
                    }),
                  );
                },
              },
            },
          ]}
        />
      </StyledTeacherItemDropdownMenu>
    </StyledTeacherItem>
  );
};
