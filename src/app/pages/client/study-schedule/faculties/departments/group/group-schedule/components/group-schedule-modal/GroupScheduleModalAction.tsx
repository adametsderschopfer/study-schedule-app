import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { BaseModal } from "@ui/components/modals/BaseModal";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  createScheduleAction,
  editScheduleAction,
  loadSchedulesAction,
} from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/actions";
import {
  selectGroupSchedule,
  selectGroupScheduleCreateCurrent,
  selectGroupScheduleEditCurrent,
} from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/selector";
import { groupScheduleSlice } from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/slice";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import {
  IScheduleEntity,
  IScheduleItem,
  TScheduleInputs,
} from "@domain/entity/study-schedule/index";
import { GroupScheduleForm } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-form/GroupScheduleForm";

type TPropsScheduleModalAction = {
  isEditModal?: boolean;
};

export const GroupScheduleModalAction: React.FC<TPropsScheduleModalAction> = (
  props,
) => {
  const { t } = useTranslation();
  const { type: moduleType } = useAppSelector(selectStudySchedule);
  const dispatch = useAppDispatch();
  const schedule = useAppSelector(selectGroupSchedule);
  const scheduleItem = useAppSelector(
    !props.isEditModal
      ? selectGroupScheduleCreateCurrent
      : selectGroupScheduleEditCurrent,
  );
  const params = useParams();

  const modal = props.isEditModal ? schedule.editModal : schedule.createModal;
  const modalTitlePrefix = props.isEditModal
    ? "editModalTitle"
    : "addModalTitle";

  const defaultValues = useMemo<Partial<IScheduleItem> | undefined>(() => {
    if (modal.itemId) {
      return scheduleItem;
    }

    if (modal.item) {
      return modal.item;
    }

    return {};
  }, [modal, scheduleItem]);

  const handleRequestClose = (): void => {
    if (props.isEditModal) {
      dispatch(
        groupScheduleSlice.actions.setEditModalShown({
          status: false,
          itemId: null,
        }),
      );

      return;
    }

    dispatch(
      groupScheduleSlice.actions.setCreateModalShown({
        status: false,
        itemId: undefined,
        item: undefined,
      }),
    );
  };

  const handleFormSubmit = async (data: TScheduleInputs): Promise<void> => {
    if (props.isEditModal) {
      if (!modal.itemId) {
        return;
      }

      await dispatch(
        editScheduleAction({
          id: modal.itemId,
          ...data,
        } as IScheduleEntity),
      );
    } else {
      await dispatch(createScheduleAction(data));
      dispatch(
        loadSchedulesAction({
          date_start: schedule.dateStart,
          date_end: schedule.dateEnd,
          group_id: params.scheduleId,
          department_id: params.departmentId,
        }),
      );
    }
  };

  return (
    <BaseModal
      headerTitle={t(
        `app.pages.StudySchedule.orgStructure.schedule.${modalTitlePrefix}.${moduleType}`,
      )}
      isOpen={modal.isShown}
      loading={modal.loading}
      onRequestClose={handleRequestClose}>
      <GroupScheduleForm
        defaultValues={defaultValues}
        onSubmit={handleFormSubmit}
        onRequestClose={handleRequestClose}
      />
    </BaseModal>
  );
};
