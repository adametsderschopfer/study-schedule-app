import React from "react";
import { useTranslation } from "react-i18next";
import { PaperTabLink } from "@ui/components/paper-tab/PaperTabLink";
import { PaperTabLinks } from "@ui/components/paper-tab/PaperTabLinks";
import { useAppSelector } from "@store/hooks";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";

const MATCH_URL_BASE =
  "/client/study-schedule/faculties/:facultyId/:departmentId";
const LANG_VARS_BASE = "app.pages.StudySchedule.orgStructure.tabMenu";

export const DepartmentsHeaderTabs: React.FC = () => {
  const { t } = useTranslation();
  const { type } = useAppSelector(selectStudySchedule);

  return (
    <PaperTabLinks>
      <PaperTabLink
        matchUrl={`${MATCH_URL_BASE}/teachers`}
        name={t(`${LANG_VARS_BASE}.teachers.${type}`)}
        href={"teachers"}
      />
      <PaperTabLink
        matchUrl={`${MATCH_URL_BASE}/subjects`}
        name={t(`${LANG_VARS_BASE}.subjects.${type}`)}
        href={"subjects"}
      />
      <PaperTabLink
        matchUrl={`${MATCH_URL_BASE}/group`}
        name={t(`${LANG_VARS_BASE}.groups.${type}`)}
        href={"group"}
      />
    </PaperTabLinks>
  );
};
