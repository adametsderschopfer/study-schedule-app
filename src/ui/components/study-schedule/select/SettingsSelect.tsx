import React from "react";
import { useTranslation } from "react-i18next";
import { Select } from "@ui/components/select/Select";
import { LoadOptionsResult, SelectProps } from "@ui/components/select/types";
import { TSelectData } from "@domain/app";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";
import { TSettingsMode } from "@domain/entity/study-schedule/index";

type Entity = TSettingsMode;
type Props = SelectProps;

export const SettingsSelect: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const loadOptions = async (
    page: number,
    loadedOptions: TSelectData<Entity>[],
  ): Promise<LoadOptionsResult> => {
    const settings = await StudyScheduleApi.settings.getModes({
      page: page,
    });

    const options = settings.data.map((setting) => ({
      label: setting.name,
      value: setting,
    }));

    return {
      options,
      hasMore: options.length + loadedOptions.length !== settings.total,
      page,
    };
  };

  return (
    <Select
      label={t(
        "app.pages.StudySchedule.orgStructure.schedule.fieldSettingItemTitle",
      )}
      placeholder={t(
        "app.pages.StudySchedule.orgStructure.schedule.fieldSettingItemPlaceholder",
      )}
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
