import React from "react";
import { useTranslation } from "react-i18next";
import { Select } from "@ui/components/select/Select";
import { LoadOptionsResult, SelectProps } from "@ui/components/select/types";
import { TSelectData } from "@domain/app";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";
import { IDepartmentEntity } from "@domain/entity/study-schedule/index";

type Entity = IDepartmentEntity;
type Props = SelectProps;

export const DepartmentSelect: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const loadOptions = async (
    page: number,
    loadedOptions: TSelectData<Entity>[],
  ): Promise<LoadOptionsResult> => {
    const departments = await StudyScheduleApi.faculty.getAllDepartments({
      page,
    });

    const options = departments.data.map((building) => ({
      label: building.name,
      value: building,
    }));

    return {
      options,
      hasMore: options.length + loadedOptions.length !== departments.total,
      page,
    };
  };

  return (
    <Select
      label={t(
        "app.pages.StudySchedule.orgStructure.group.createGroup.universityDepartmentFieldTitle",
      )}
      placeholder={t(
        "app.pages.StudySchedule.orgStructure.group.createGroup.universityDepartmentFieldPlaceholder",
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
