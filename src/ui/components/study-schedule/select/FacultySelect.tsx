import React from "react";
import { useTranslation } from "react-i18next";
import { Select } from "@ui/components/select/Select";
import { LoadOptionsResult, SelectProps } from "@ui/components/select/types";
import { TSelectData } from "@domain/app";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";
import { IFacultyEntity } from "@domain/entity/study-schedule/index";

type Entity = IFacultyEntity;
type Props = SelectProps;

export const FacultySelect: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  const loadOptions = async (
    page: number,
    loadedOptions: TSelectData<Entity>[],
  ): Promise<LoadOptionsResult> => {
    const faculties = await StudyScheduleApi.faculty.getFaculties({
      page,
    });

    const options = faculties.data.map((faculty) => ({
      label: faculty.name,
      value: faculty,
    }));

    return {
      options,
      hasMore: options.length + loadedOptions.length !== faculties.total,
      page,
    };
  };

  return (
    <Select
      label={t(
        "app.pages.StudySchedule.orgStructure.group.createGroup.universityFacultyFieldTitle",
      )}
      placeholder={t(
        "app.pages.StudySchedule.orgStructure.group.createGroup.universityFacultyFieldPlaceholder",
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
