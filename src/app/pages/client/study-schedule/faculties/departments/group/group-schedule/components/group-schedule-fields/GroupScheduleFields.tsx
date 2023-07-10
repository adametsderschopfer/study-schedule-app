import { DateTime } from "luxon";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@ui/components/input/Input";
import { StyledControlRow } from "@ui/components/layout/Control";
import { Select } from "@ui/components/select/Select";
import { BuildingSelect } from "@ui/components/study-schedule/select/BuildingSelect";
import { SettingsSelect } from "@ui/components/study-schedule/select/SettingsSelect";
import { SubjectSelect } from "@ui/components/study-schedule/select/SubjectSelect";
import { TeacherSelect } from "@ui/components/study-schedule/select/TeacherSelect";
import { TypeSelector } from "@ui/components/type-selector/TypeSelector";
import { useAppSelector } from "@store/hooks";
import { selectGroupScheduleEditCurrent } from "@store/modules/study-schedule/sections/faculties/sections/group-schedule/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { DATE_FORMAT, TSelectData } from "@domain/app";
import {
  EStudyScheduleTypes,
  IBuildingClassroomEntity,
  IBuildingEntity,
  ISubjectEntity,
  ITeacherEntity,
  TSettingsMode,
} from "@domain/entity/study-schedule/index";
import {
  StyledFieldsWrapper,
  StyledSelectCabinet,
} from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/components/group-schedule-fields/styled";
import { TGroupScheduleFormFieldsProps } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/types";

export const GroupScheduleFields: React.FC<TGroupScheduleFormFieldsProps> = (
  props,
) => {
  const { t } = useTranslation("", {
    keyPrefix: "app.pages.StudySchedule.orgStructure.schedule",
  });
  const { type: moduleType } = useAppSelector(selectStudySchedule);
  const editData = useAppSelector(selectGroupScheduleEditCurrent);

  const {
    formState: { errors },
    getValues,
    setValue,
    clearErrors,
    watch,
  } = props.form;

  const [currentBuilding, setCurrentBuilding] = useState<
    TSelectData<IBuildingEntity | undefined>
  >({
    label: editData?.building ? editData.building.name : "",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    value: editData?.building
      ? {
          ...editData.building,
          building_classrooms: [editData.building_classroom],
        }
      : undefined,
  });
  const [currentSettings, setCurrentSettings] =
    useState<TSelectData<TSettingsMode | undefined>>();

  const classroomOptions = useMemo<
    TSelectData<IBuildingClassroomEntity>[]
  >(() => {
    if (!currentBuilding || !currentBuilding.value) {
      return [];
    }

    return currentBuilding.value.building_classrooms.map((item) => ({
      value: item,
      label: item.name,
    }));
  }, [currentBuilding]);

  const lessonsOptions = useMemo(() => {
    return currentSettings?.value?.lessons.map((lesson, index) => ({
      name: `${index + 1} ${t(`fieldSettingsSelectLessonTitle.${moduleType}`)}`,
      value: index,
      tooltipLabel: `${lesson.time_start} - ${lesson.time_end}`,
    }));
  }, [currentSettings]);

  useEffect(() => {
    watch("repeat_start");
    watch("repeat_end");
    watch("schedule_setting_id");
    watch("schedule_setting_item_order");
  }, []);

  return (
    <StyledFieldsWrapper>
      <StyledControlRow>
        <SettingsSelect
          onChange={(option: TSelectData<TSettingsMode>): void => {
            setCurrentSettings(option);
            clearErrors("schedule_setting_id");
            setValue("schedule_setting_id", option.value.id);
            setValue("schedule_setting_item_order", 0);
          }}
          afterLoad={(options: TSelectData<TSettingsMode>[]): void => {
            setCurrentSettings(
              options.find(
                (item) => item.value.id === getValues("schedule_setting_id"),
              ),
            );
          }}
          value={{
            label: editData?.schedule_setting.name,
            value: editData?.schedule_setting,
          }}
          isValid={!errors.schedule_setting_id}
          errorMessage={errors.schedule_setting_id?.message}
          valueResolver={(option: TSelectData<TSettingsMode>): boolean =>
            option.value.id === getValues("schedule_setting_id")
          }
        />
      </StyledControlRow>

      {!!getValues("schedule_setting_id") && lessonsOptions && (
        <TypeSelector
          currentValue={getValues("schedule_setting_item_order")}
          onItemSelect={(item): void => {
            setValue("schedule_setting_item_order", item.value);
          }}
          items={lessonsOptions}
        />
      )}

      <StyledControlRow>
        <Select
          isValid={!errors.day_of_week}
          errorMessage={errors.day_of_week?.message}
          label={t("fieldDayOfWeekTitle")}
          placeholder={t("fieldDayOfWeekPlaceholder")}
          onChange={({ value }: TSelectData<number>): void => {
            clearErrors("day_of_week");
            setValue("day_of_week", value);
          }}
          valueResolver={(option: TSelectData<number>): boolean =>
            option.value === getValues("day_of_week")
          }
          isWide={true}
          options={props.fields.dayOfWeekOptions}
        />
        <Select
          isValid={!errors.repeatability}
          errorMessage={errors.repeatability?.message}
          label={t("fieldRepeatabilityTitle")}
          placeholder={t("fieldRepeatabilityPlaceholder")}
          onChange={({ value }: TSelectData<number>): void => {
            clearErrors("repeatability");
            setValue("repeatability", value);
          }}
          valueResolver={(option: TSelectData<number>): boolean =>
            option.value === getValues("repeatability")
          }
          isWide={true}
          options={props.fields.repeatabilityOptions}
        />
        {moduleType === EStudyScheduleTypes.COLLEGE && (
          <Select
            isValid={!errors.type}
            errorMessage={errors.type?.message}
            label={t("fieldTypeTitle")}
            placeholder={t("fieldTypePlaceholder")}
            onChange={({ value }: TSelectData<number>): void => {
              clearErrors("type");
              setValue("type", value);
            }}
            valueResolver={(option: TSelectData<number>): boolean =>
              option.value === getValues("type")
            }
            isWide={true}
            options={props.fields.typeOptions}
          />
        )}
      </StyledControlRow>

      <StyledControlRow>
        <BuildingSelect
          isValid={!errors.building_id}
          errorMessage={errors.building_id?.message}
          onChange={(option: TSelectData<IBuildingEntity>): void => {
            setCurrentBuilding(option);
            clearErrors("building_id");

            setValue("building_id", option.value.id);
            setValue("building_classroom_id", null);
          }}
          value={
            editData?.building
              ? {
                  label: editData?.building.name,
                  value: editData?.building,
                }
              : undefined
          }
          valueResolver={(option: TSelectData<IBuildingEntity>): boolean =>
            option.value.id === getValues("building_id")
          }
        />
        <StyledSelectCabinet>
          <Select
            isValid={!errors.building_classroom_id}
            errorMessage={errors.building_classroom_id?.message}
            label={t(`fieldClassroomTitle.${moduleType}`)}
            placeholder={t(`fieldClassroomPlaceholder.${moduleType}`)}
            noOptionsMessage={(): string => t("fieldClassroomNoOptionsMessage")}
            isWide={true}
            isSearchable={true}
            onChange={({
              value,
            }: TSelectData<IBuildingClassroomEntity>): void => {
              clearErrors("building_classroom_id");
              setValue("building_classroom_id", value.id);
            }}
            valueResolver={(
              option: TSelectData<IBuildingClassroomEntity>,
            ): boolean => option.value?.id === watch("building_classroom_id")}
            options={classroomOptions}
          />
        </StyledSelectCabinet>
      </StyledControlRow>

      <StyledControlRow>
        <TeacherSelect
          isValid={!errors.teacher_id}
          errorMessage={errors.teacher_id?.message}
          onChange={(option: TSelectData<ITeacherEntity>): void => {
            clearErrors("teacher_id");
            setValue("teacher_id", option.value.id);
          }}
          value={{
            label: editData?.teacher.full_name,
            value: editData?.teacher,
          }}
          valueResolver={(option: TSelectData<ITeacherEntity>): boolean =>
            option.value.id === getValues("teacher_id")
          }
        />
        <SubjectSelect
          onChange={(option: TSelectData<ISubjectEntity>): void => {
            clearErrors("subject_id");
            setValue("subject_id", option.value.id);
          }}
          valueResolver={(option: TSelectData<ISubjectEntity>): boolean =>
            option.value.id === getValues("subject_id")
          }
          value={{
            label: editData?.subject.name,
            value: editData?.subject,
          }}
          isValid={!errors.subject_id}
          errorMessage={errors.subject_id?.message}
        />
      </StyledControlRow>

      {moduleType === EStudyScheduleTypes.UNIVERSITY && (
        <StyledControlRow>
          <Select
            isValid={!errors.type}
            errorMessage={errors.type?.message}
            label={t("fieldTypeTitle")}
            placeholder={t("fieldTypePlaceholder")}
            onChange={({ value }: TSelectData<number>): void => {
              clearErrors("type");
              setValue("type", value);
            }}
            valueResolver={(option: TSelectData<number>): boolean =>
              option.value === getValues("type")
            }
            isWide={true}
            options={props.fields.typeOptions}
          />
          <Select
            isValid={!errors.sub_group}
            errorMessage={errors.sub_group?.message}
            label={t("fieldSubgroupTitle")}
            placeholder={t("fieldSubgroupPlaceholder")}
            onChange={({ value }: TSelectData<number>): void => {
              clearErrors("sub_group");
              setValue("sub_group", value);
            }}
            valueResolver={(option: TSelectData<number>): boolean =>
              option.value === getValues("sub_group")
            }
            isWide={true}
            options={props.fields.subGroupOptions}
          />
        </StyledControlRow>
      )}

      <StyledControlRow isLast={true}>
        <Input
          isValid={!errors.repeat_start}
          errorMessage={errors.repeat_start?.message}
          label={t(`fieldRepeatStartTitle.${moduleType}`)}
          type={"date"}
          isWide={true}
          datePickerProps={{
            placeholderText: t("fieldRepeatStartPlaceholder") as string,
            dateFormat: "dd.MM.yyyy",
            selected: getValues("repeat_start")?.length
              ? DateTime.fromFormat(
                  getValues("repeat_start") as string,
                  DATE_FORMAT,
                ).toJSDate()
              : undefined,
            onChange: (date: Date): void => {
              setValue(
                "repeat_start",
                DateTime.fromJSDate(date).toFormat(DATE_FORMAT),
              );
            },
          }}
        />

        <Input
          isValid={!errors.repeat_end}
          errorMessage={errors.repeat_end?.message}
          label={t(`fieldRepeatEndTitle.${moduleType}`)}
          type={"date"}
          isWide={true}
          datePickerProps={{
            dateFormat: "dd.MM.yyyy",
            placeholderText: t("fieldRepeatEndPlaceholder") as string,
            selected: getValues("repeat_end")?.length
              ? DateTime.fromFormat(
                  getValues("repeat_end") as string,
                  DATE_FORMAT,
                ).toJSDate()
              : undefined,
            onChange: (date: Date): void => {
              setValue(
                "repeat_end",
                DateTime.fromJSDate(date).toFormat(DATE_FORMAT),
              );
            },
          }}
        />
      </StyledControlRow>
    </StyledFieldsWrapper>
  );
};
