import React from "react";
import { BuildingIcon } from "@ui/components/icons/BuildingIcon";
import { OrgStructureIcon } from "@ui/components/icons/OrgStructureIcon";
import { SettingsIcon } from "@ui/components/icons/SettingsIcon";
import { TimetableIcon } from "@ui/components/icons/TimetableIcon";
import { TMenuCategory } from "@domain/menu";

export const headerMenuListByRole: Record<
  string,
  Record<string, TMenuCategory>
> = {
  Administrator: {
    header: {
      list: [],
    },
  },
  Client: {
    StudySchedule: {
      title: "Study Schedule",
      linkTo: "/client/study-schedule/",
      list: [
        {
          icon: <TimetableIcon />,
          langVariable: "app.menu.StudySchedule.timetable",
          linkTo: "/client/study-schedule/schedule",
        },
        {
          icon: <OrgStructureIcon />,
          langVariable: "app.menu.StudySchedule.organizationalStructure",
          linkTo: "/client/study-schedule/faculties",
        },
        {
          icon: <BuildingIcon />,
          langVariable: "app.menu.StudySchedule.building",
          linkTo: "/client/study-schedule/building",
        },
        {
          icon: <SettingsIcon />,
          langVariable: "app.menu.StudySchedule.settings",
          linkTo: "/client/study-schedule/settings",
        },
      ],
      conditionFn(user): boolean {
        return !!user.isStudyScheduleEnabled;
      },
    },
    InfoPanel: {
      title: "Info Panel",
      linkTo: `${window.location.origin}/client/infopanels`,
      isNativeAnchor: true,
      conditionFn(user): boolean {
        return !!user.isInfoPanelEnabled;
      },
    },
    DigitalDirectory: {
      title: "Digital Directory",
      linkTo: `${window.location.origin}/client/digital-directory/projects`,
      isNativeAnchor: true,
      conditionFn(user): boolean {
        return !!user.isDigitalDirectoryEnabled;
      },
    },
    DigitalSignage: {
      title: "Digital Signage",
      linkTo: `${window.location.origin}/client/ds`,
      isNativeAnchor: true,
      conditionFn(user): boolean {
        return !!user.isDigitalSignageEnabled;
      },
    },
  },
};
