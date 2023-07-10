import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "@ui/components/select/Select";
import {
  LoadOptionsResult,
  SelectProps,
  TSelectOption,
} from "@ui/components/select/types";
import { TSelectData } from "@domain/app";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";
import { ITeacherEntity } from "@domain/entity/study-schedule/index";

type Entity = ITeacherEntity;
type Props = SelectProps & {
  departmentId?: Id;
};

export const TeacherSelect: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const loadOptions = useCallback(
    async (
      page: number,
      loadedOptions: TSelectData<Entity>[],
    ): Promise<LoadOptionsResult> => {
      let teachers;

      if (props.departmentId) {
        teachers = await StudyScheduleApi.teacher.getTeachers({
          page: page,
          departmentId: props.departmentId,
        });
      } else {
        teachers = await StudyScheduleApi.teacher.getAllTeachers({
          page: page,
        });
      }

      const options = teachers.data.map((teacher) => ({
        label: teacher.full_name,
        value: teacher,
      }));

      return {
        options,
        hasMore: options.length + loadedOptions.length !== teachers.total,
        page,
      };
    },
    [props.departmentId],
  );

  const asyncSearchHandler = async (
    query: string,
  ): Promise<TSelectOption[]> => {
    const data = await StudyScheduleApi.teacher.searchTeachers(query);

    return data.map((item) => ({
      label: item.full_name,
      value: item,
    }));
  };

  return (
    <Select
      label={t(
        "app.pages.StudySchedule.orgStructure.schedule.fieldTeacherTitle",
      )}
      placeholder={t(
        "app.pages.StudySchedule.orgStructure.schedule.fieldTeacherPlaceholder",
      )}
      asyncSearchHandler={asyncSearchHandler}
      isSearchable={true}
      infiniteScrollProps={{
        pageStart: 1,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        initialLoad: true,
        hasMore: true,
      }}
      loadOptions={loadOptions}
      isWide={true}
      {...props}
    />
  );
};
