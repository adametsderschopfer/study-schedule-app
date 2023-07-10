import { UseFormReturn } from "react-hook-form";
import { TScheduleInputs } from "@domain/entity/study-schedule/index";
import { TUseScheduleStaticFields } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-form/useScheduleStaticFields";

export type TFields = Pick<TUseScheduleStaticFields, "fields">;

export type TGroupScheduleFormFieldsProps = TFields & {
  form: UseFormReturn<TScheduleInputs, any>;
};
