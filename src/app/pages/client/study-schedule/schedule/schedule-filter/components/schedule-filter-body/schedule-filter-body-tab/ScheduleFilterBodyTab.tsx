import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CodeError } from "@ui/components/error-view/error-view-variants/CodeError";
import { StyledControlRow } from "@ui/components/layout/Control";
import { Select } from "@ui/components/select/Select";
import { BuildingSelect } from "@ui/components/study-schedule/select/BuildingSelect";
import { DepartmentSelect } from "@ui/components/study-schedule/select/DepartmentSelect";
import { GroupsSelect } from "@ui/components/study-schedule/select/GroupSelect";
import { TeacherSelect } from "@ui/components/study-schedule/select/TeacherSelect";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { selectSchedule } from "@store/modules/study-schedule/sections/schedule/selector";
import { scheduleSlice } from "@store/modules/study-schedule/sections/schedule/slice";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { TSelectData } from "@domain/app";
import {
  EStudyScheduleTypes,
  IBuildingEntity,
  IDepartmentEntity,
  IGroupEntity,
  ITeacherEntity,
  TScheduleSetFilterPayload,
} from "@domain/entity/study-schedule/index";
import { useFilterFields } from "@app/pages/client/study-schedule/schedule/schedule-filter/components/schedule-filter-body/schedule-filter-body-tab/useFilterFields";

export enum ScheduleFilterBodyTabTypes {
  GROUP,
  TEACHER,
  CLASSROOM,
}

export type ScheduleFilterBodyTabProps = {
  type: ScheduleFilterBodyTabTypes;
};

export const ScheduleFilterBodyTab: React.FC<ScheduleFilterBodyTabProps> = (
  props,
) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { type: moduleType } = useAppSelector(selectStudySchedule);
  const schedule = useAppSelector(selectSchedule);
  const fields = useFilterFields();

  const [currentBuilding, setCurrentBuilding] = useState<
    IBuildingEntity | undefined
  >(undefined);

  useEffect(() => {
    dispatch(scheduleSlice.actions.clearFilter({ isIgnoreDate: true }));
  }, []);

  const classroomOptions = useMemo(
    () =>
      currentBuilding?.building_classrooms.map((classroom) => ({
        value: classroom.id,
        label: classroom.name,
      })) || [],
    [currentBuilding],
  );

  const handleSelectChange = (
    name: TScheduleSetFilterPayload["name"] | string,
    value: TScheduleSetFilterPayload["value"],
  ): void => {
    dispatch(
      scheduleSlice.actions.setFilter({
        name,
        value,
      }),
    );
  };

  if (props.type === ScheduleFilterBodyTabTypes.GROUP) {
    if (moduleType === EStudyScheduleTypes.SCHOOL) {
      return (
        <StyledControlRow>
          <Select
            label={t(
              "app.pages.StudySchedule.orgStructure.group.createGroup.schoolClassroomFieldTitle",
            )}
            placeholder={t(
              "app.pages.StudySchedule.orgStructure.group.createGroup.schoolClassroomFieldPlaceholder",
            )}
            onChange={({ value }: TSelectData<number>): void => {
              handleSelectChange("year_of_education", value);
            }}
            valueResolver={(option: TSelectData<number>): boolean =>
              option.value === schedule.filter.year_of_education
            }
            hasEmptyOption={true}
            isWide={true}
            options={fields.yearOfEducationOptions}
          />
          <Select
            label={t(
              "app.pages.StudySchedule.orgStructure.group.createGroup.schoolLevelFieldTitle",
            )}
            placeholder={t(
              "app.pages.StudySchedule.orgStructure.group.createGroup.schoolLevelFieldPlaceholder",
            )}
            onChange={({ value }: TSelectData<string>): void => {
              handleSelectChange("letter", value);
            }}
            valueResolver={(option: TSelectData<string>): boolean =>
              option.value === schedule.filter.letter
            }
            isWide={true}
            hasEmptyOption={true}
            options={fields.letterOptions}
          />
        </StyledControlRow>
      );
    }

    return (
      <div>
        {moduleType === EStudyScheduleTypes.UNIVERSITY ? (
          <StyledControlRow>
            <Select
              label={t(
                "app.pages.StudySchedule.orgStructure.group.createGroup.universityDegreeFieldTitle",
              )}
              placeholder={t(
                "app.pages.StudySchedule.orgStructure.group.createGroup.universityDegreeFieldPlaceholder",
              )}
              onChange={({ value }: TSelectData<number>): void => {
                handleSelectChange("degree", value);
              }}
              valueResolver={(option: TSelectData<number>): boolean =>
                option.value === schedule.filter.degree
              }
              hasEmptyOption={true}
              isWide={true}
              options={fields.degreeOptions}
            />
            <DepartmentSelect
              onChange={({ value }: TSelectData<IDepartmentEntity>): void => {
                handleSelectChange("group_id", undefined);
                handleSelectChange("department_id", value?.id);
              }}
              valueResolver={(
                option: TSelectData<IDepartmentEntity>,
              ): boolean => option.value?.id === schedule.filter?.department_id}
            />
          </StyledControlRow>
        ) : null}

        <StyledControlRow>
          <GroupsSelect
            label={t("app.pages.StudySchedule.schedule.groupFieldTitle")}
            placeholder={t(
              "app.pages.StudySchedule.schedule.groupFieldPlaceholder",
            )}
            onChange={({ value }: TSelectData<IGroupEntity>): void => {
              handleSelectChange("group_id", value?.id);
            }}
            valueResolver={(option: TSelectData<ITeacherEntity>): boolean =>
              option.value.id === schedule.filter?.group_id
            }
            isWide={true}
            hasEmptyOption={true}
          />
        </StyledControlRow>
      </div>
    );
  }

  if (props.type === ScheduleFilterBodyTabTypes.TEACHER) {
    if (moduleType === EStudyScheduleTypes.SCHOOL) {
      return (
        <div>
          <StyledControlRow>
            <TeacherSelect
              onChange={({ value }: TSelectData<ITeacherEntity>): void => {
                handleSelectChange("teacher_id", value?.id);
              }}
              valueResolver={(option: TSelectData<ITeacherEntity>): boolean =>
                option.value.id === schedule.filter?.teacher_id
              }
            />
          </StyledControlRow>

          <StyledControlRow>
            <Select
              label={t(
                "app.pages.StudySchedule.orgStructure.group.createGroup.schoolClassroomFieldTitle",
              )}
              placeholder={t(
                "app.pages.StudySchedule.orgStructure.group.createGroup.schoolClassroomFieldPlaceholder",
              )}
              onChange={({ value }: TSelectData<Id>): void => {
                handleSelectChange("year_of_education", value);
              }}
              valueResolver={(option: TSelectData<number>): boolean =>
                option.value === schedule.filter.year_of_education
              }
              isWide={true}
              hasEmptyOption={true}
              options={fields.yearOfEducationOptions}
            />
            <Select
              label={t(
                "app.pages.StudySchedule.orgStructure.group.createGroup.schoolLevelFieldTitle",
              )}
              placeholder={t(
                "app.pages.StudySchedule.orgStructure.group.createGroup.schoolLevelFieldPlaceholder",
              )}
              onChange={({ value }: TSelectData<string>): void => {
                handleSelectChange("letter", value);
              }}
              valueResolver={(option: TSelectData<string>): boolean =>
                option.value === schedule.filter.letter
              }
              isWide={true}
              hasEmptyOption={true}
              options={fields.letterOptions}
            />
          </StyledControlRow>
        </div>
      );
    }

    return (
      <div>
        <StyledControlRow>
          <TeacherSelect
            onChange={({ value }: TSelectData<ITeacherEntity>): void => {
              handleSelectChange("teacher_id", value?.id);
            }}
            valueResolver={(option: TSelectData<ITeacherEntity>): boolean =>
              option.value.id === schedule.filter?.teacher_id
            }
          />
        </StyledControlRow>
        <StyledControlRow>
          <GroupsSelect
            onChange={({ value }: TSelectData<IGroupEntity>): void => {
              handleSelectChange("group_id", value?.id);
            }}
            valueResolver={(option: TSelectData<ITeacherEntity>): boolean =>
              option.value.id === schedule.filter?.group_id
            }
            hasEmptyOption={true}
          />
        </StyledControlRow>
      </div>
    );
  }

  if (props.type === ScheduleFilterBodyTabTypes.CLASSROOM) {
    return (
      <div>
        <StyledControlRow>
          <BuildingSelect
            onChange={({ value }: TSelectData<IBuildingEntity>): void => {
              const id = value?.id;

              handleSelectChange("building_classroom_id", undefined);
              handleSelectChange("building_id", id);

              setCurrentBuilding(id ? value : undefined);
            }}
            valueResolver={(option: TSelectData<IBuildingEntity>): boolean =>
              option.value?.id === schedule.filter?.building_id
            }
          />
        </StyledControlRow>
        <StyledControlRow>
          <Select
            label={t(
              `app.pages.StudySchedule.orgStructure.schedule.fieldClassroomTitle.${moduleType}`,
            )}
            placeholder={t(
              `app.pages.StudySchedule.orgStructure.schedule.fieldClassroomPlaceholder.${moduleType}`,
            )}
            noOptionsMessage={(): string =>
              t(
                "app.pages.StudySchedule.orgStructure.schedule.fieldClassroomNoOptionsMessage",
              )
            }
            onChange={({ value }: TSelectData<Id>): void => {
              handleSelectChange("building_classroom_id", value);
            }}
            valueResolver={(option: TSelectData<Id>): boolean =>
              option.value === schedule.filter?.building_classroom_id
            }
            isWide={true}
            hasEmptyOption={!!currentBuilding}
            options={classroomOptions}
          />
        </StyledControlRow>
      </div>
    );
  }

  return <CodeError />;
};
