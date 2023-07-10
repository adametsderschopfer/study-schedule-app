import React from "react";
import { useTranslation } from "react-i18next";
import { BaseModal } from "@ui/components/modals/BaseModal";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { groupSlice } from "@store/modules/index";
import {
  createGroupAction,
  editGroupAction,
} from "@store/modules/study-schedule/sections/faculties/sections/group/actions";
import {
  selectGroupSelf,
  selectStudyScheduleGroupEditCurrent,
} from "@store/modules/study-schedule/sections/faculties/sections/group/selector";
import {
  IGroupEntity,
  TGroupInputs,
} from "@domain/entity/study-schedule/index";
import { GroupForm } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/GroupForm";

type TPropsGroupModalAction = {
  isEditModal?: boolean;
};

export const GroupModalAction: React.FC<TPropsGroupModalAction> = (props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const group = useAppSelector(selectGroupSelf);
  const currentEditGroup = useAppSelector(selectStudyScheduleGroupEditCurrent);

  const modal = props.isEditModal ? group.editModal : group.createModal;

  const handleRequestClose = (): void => {
    if (props.isEditModal) {
      dispatch(
        groupSlice.actions.setEditGroupFormShown({
          status: false,
          itemId: null,
        }),
      );
    } else {
      dispatch(groupSlice.actions.setCreateGroupFormShown(false));
    }
  };

  const handleSubmit = (_data: TGroupInputs): void => {
    let data = { ..._data } as Partial<TGroupInputs>;
    if (data.teacher_id === null) {
      delete data.teacher_id;
    }

    if (props.isEditModal) {
      if (!currentEditGroup) {
        return;
      }

      data = {
        ...currentEditGroup,
        ..._data,
      } as Partial<IGroupEntity>;

      if (data.teacher_id === null) {
        delete data.teacher_id;
      }

      dispatch(editGroupAction(data as IGroupEntity));
      return;
    }

    dispatch(createGroupAction(data as Required<TGroupInputs>));
  };

  return (
    <BaseModal
      onRequestClose={handleRequestClose}
      loading={modal.loading}
      isOpen={modal.isShown}
      headerTitle={t(
        `app.pages.StudySchedule.orgStructure.group.${
          props.isEditModal ? "edit" : "create"
        }GroupModalTitle`,
      )}>
      <GroupForm
        onSubmit={handleSubmit}
        defaultValues={currentEditGroup}
        onRequestClose={handleRequestClose}
      />
    </BaseModal>
  );
};
