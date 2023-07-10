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
import { ISubjectEntity } from "@domain/entity/study-schedule/index";

type Entity = ISubjectEntity;
type Props = SelectProps & {
  departmentId?: Id;
};

export const SubjectSelect: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const loadOptions = useCallback(
    async (
      page: number,
      loadedOptions: TSelectData<Entity>[],
    ): Promise<LoadOptionsResult> => {
      const subjects = await StudyScheduleApi.subject.getSubjects({
        page: page,
        departmentId: props.departmentId,
      });

      const options = subjects.data.map((subject) => ({
        label: subject.name,
        value: subject,
      }));

      return {
        options,
        hasMore: options.length + loadedOptions.length !== subjects.total,
        page,
      };
    },
    [props.departmentId],
  );

  const asyncSearchHandler = async (
    query: string,
  ): Promise<TSelectOption[]> => {
    const data = await StudyScheduleApi.subject.searchSubjects(query);

    return data.map((item) => ({
      label: item.name,
      value: item,
    }));
  };

  return (
    <Select
      label={t(
        "app.pages.StudySchedule.orgStructure.schedule.fieldSubjectTitle",
      )}
      placeholder={t(
        "app.pages.StudySchedule.orgStructure.schedule.fieldSubjectPlaceholder",
      )}
      loadOptions={loadOptions}
      isWide={true}
      asyncSearchHandler={asyncSearchHandler}
      isSearchable={true}
      infiniteScrollProps={{
        pageStart: 1,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        initialLoad: true,
        hasMore: true,
      }}
      {...props}
    />
  );
};
