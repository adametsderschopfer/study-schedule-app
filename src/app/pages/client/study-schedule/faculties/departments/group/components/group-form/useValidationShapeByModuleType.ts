import { ObjectShape } from "yup";
import * as yup from "yup";
import { useAppSelector } from "@store/hooks";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { EStudyScheduleTypes } from "@domain/entity/study-schedule/index";
import {
  lengthMoreThan3ErrorMessage,
  requiredErrorMessage,
} from "@app/i18n/defaults";

export const useValidationShapeByModuleType = (): ObjectShape => {
  const { type: moduleType } = useAppSelector(selectStudySchedule);

  switch (moduleType) {
    case EStudyScheduleTypes.SCHOOL: {
      return {
        name: yup
          .string()
          .min(3, lengthMoreThan3ErrorMessage)
          .required(requiredErrorMessage),
        letter: yup.string().required(requiredErrorMessage),
        teacher_id: yup.string().required(requiredErrorMessage),
        year_of_education: yup.number().required(requiredErrorMessage),
      };
    }

    case EStudyScheduleTypes.COLLEGE: {
      return {
        name: yup
          .string()
          .min(3, lengthMoreThan3ErrorMessage)
          .required(requiredErrorMessage),
        year_of_education: yup.number().required(requiredErrorMessage),
        form_of_education: yup.number().required(requiredErrorMessage),
      };
    }

    case EStudyScheduleTypes.UNIVERSITY: {
      return {
        name: yup
          .string()
          .min(3, lengthMoreThan3ErrorMessage)
          .required(requiredErrorMessage),
        department_id: yup
          .number()
          .typeError(requiredErrorMessage)
          .required(requiredErrorMessage),
        degree: yup.number().required(requiredErrorMessage),
        sub_group: yup.number().required(requiredErrorMessage),
        year_of_education: yup.number().required(requiredErrorMessage),
        form_of_education: yup.number().required(requiredErrorMessage),
      };
    }
  }

  return {};
};
