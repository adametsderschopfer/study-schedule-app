import * as yup from "yup";
import { useAppSelector } from "@store/hooks";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { EStudyScheduleTypes } from "@domain/entity/study-schedule/index";
import { requiredErrorMessage } from "@app/i18n/defaults";

export const useValidationShapeByModuleType = (): yup.ObjectShape => {
  const { type: moduleType } = useAppSelector(selectStudySchedule);
  const defaultFields = {
    day_of_week: yup.number().required(requiredErrorMessage),
    repeatability: yup.number().required(requiredErrorMessage),
    teacher_id: yup.string().required(requiredErrorMessage),
    building_id: yup.string().required(requiredErrorMessage),
    building_classroom_id: yup.string().required(requiredErrorMessage),
    schedule_setting_id: yup.string().required(requiredErrorMessage),
    schedule_setting_item_order: yup.string().required(requiredErrorMessage),
    subject_id: yup.string().required(requiredErrorMessage),
    repeat_start: yup.string().required(requiredErrorMessage),
    repeat_end: yup.string().required(requiredErrorMessage),
  };

  switch (moduleType) {
    case EStudyScheduleTypes.SCHOOL: {
      return { ...defaultFields };
    }

    case EStudyScheduleTypes.COLLEGE: {
      return {
        ...defaultFields,

        type: yup.number().required(requiredErrorMessage),
      };
    }

    case EStudyScheduleTypes.UNIVERSITY: {
      return {
        ...defaultFields,

        type: yup.number().required(requiredErrorMessage),
        sub_group: yup.number().required(requiredErrorMessage),
      };
    }
  }

  return {};
};
