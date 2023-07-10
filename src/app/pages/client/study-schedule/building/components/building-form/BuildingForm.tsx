import { yupResolver } from "@hookform/resolvers/yup";
import { validateClassroom } from "@utils/validators/validateString";
import * as yup from "yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/components/button/Button";
import {
  StyledFormInput,
  StyledFormInputLast,
} from "@ui/components/input/Input";
import { StyledCancelButton } from "@ui/components/modals/styled";
import { TFormPropsBase } from "@domain/app";
import {
  IBuildingEntity,
  TBuildingInputs,
} from "@domain/entity/study-schedule/index";
import {
  lengthMoreThan3ErrorMessage,
  requiredErrorMessage,
} from "@app/i18n/defaults";

const validationScheme = yup.object().shape({
  name: yup
    .string()
    .required(requiredErrorMessage)
    .min(3, lengthMoreThan3ErrorMessage),
  address: yup
    .string()
    .required(requiredErrorMessage)
    .min(3, lengthMoreThan3ErrorMessage),
  building_classrooms: yup
    .string()
    .required(requiredErrorMessage)
    .test("building_classrooms_test", (value, ctx) => {
      const result = validateClassroom(value);

      if (!result.length) {
        return true;
      }

      return ctx.createError({ message: result[0] });
    }),
});

export const BuildingForm: React.FC<
  TFormPropsBase<TBuildingInputs, IBuildingEntity>
> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TBuildingInputs>({
    defaultValues: props.defaultValues
      ? {
          ...props.defaultValues,
          building_classrooms: props.defaultValues.building_classrooms
            ?.map((item) => item.name)
            .join(", "),
        }
      : {},
    resolver: yupResolver(validationScheme),
  });
  const { t } = useTranslation();
  const { t: tBuilding } = useTranslation("", {
    keyPrefix: "app.features.study-schedule.building",
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <StyledFormInput
        {...register("name")}
        label={tBuilding("buildingModalFieldTitle")}
        placeholder={tBuilding("buildingModalFieldTitle_placeholder")}
        isWide={true}
        isValid={!errors["name"]}
        errorMessage={errors["name"]?.message}
      />
      <StyledFormInput
        {...register("address")}
        label={tBuilding("buildingModalFieldAddress")}
        placeholder={tBuilding("buildingModalFieldAddress_placeholder")}
        isWide={true}
        isValid={!errors["address"]}
        errorMessage={errors["address"]?.message}
      />
      <StyledFormInputLast
        {...register("building_classrooms")}
        label={tBuilding("buildingModalFieldClassroom")}
        placeholder={tBuilding("buildingModalFieldClassroom_placeholder")}
        isWide={true}
        isMultiline={true}
        isValid={!errors["building_classrooms"]}
        errorMessage={errors["building_classrooms"]?.message}
      />

      {!!props.defaultValues && (
        <StyledCancelButton onClick={props.onRequestClose}>
          {t("app.modals.cancel")}
        </StyledCancelButton>
      )}

      <Button type={"submit"} mode={"wide"}>
        {t("app.modals.save")}
      </Button>
    </form>
  );
};
