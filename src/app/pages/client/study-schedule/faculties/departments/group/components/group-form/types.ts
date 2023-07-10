import { UseFormReturn } from "react-hook-form";
import {
  IGroupEntity,
  TGroupInputs,
} from "@domain/entity/study-schedule/index";

export type GroupFormFieldsProps = {
  form: UseFormReturn<TGroupInputs, any>;
  currentEditGroup?: IGroupEntity;
};
