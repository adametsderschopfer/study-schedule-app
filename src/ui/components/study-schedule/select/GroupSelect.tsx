import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "@ui/components/select/Select";
import { LoadOptionsResult, SelectProps } from "@ui/components/select/types";
import { TSelectData } from "@domain/app";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";
import { ITeacherEntity } from "@domain/entity/study-schedule/index";

type Entity = ITeacherEntity;
type Props = SelectProps & {
  departmentId?: Id;
};

export const GroupsSelect: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const loadOptions = useCallback(
    async (
      page: number,
      loadedOptions: TSelectData<Entity>[],
    ): Promise<LoadOptionsResult> => {
      const groups = await StudyScheduleApi.group.getAllGroups({
        page: page,
      });

      const options = groups.data.map((group) => ({
        label: group.name,
        value: group,
      }));

      return {
        options,
        hasMore: options.length + loadedOptions.length !== groups.total,
        page,
      };
    },
    [props.departmentId],
  );

  return (
    <Select
      label={t("app.pages.StudySchedule.schedule.groupFieldTitle")}
      placeholder={t("app.pages.StudySchedule.schedule.groupFieldPlaceholder")}
      loadOptions={loadOptions}
      isWide={true}
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
