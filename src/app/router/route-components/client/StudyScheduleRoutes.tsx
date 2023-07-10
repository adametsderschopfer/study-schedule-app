import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { BuildingPage } from "@app/pages/client/study-schedule/building/BuildingPage";
import { DepartmentsLayout } from "@app/pages/client/study-schedule/faculties/departments/DepartmentsLayout";
import { GroupSchedulePage } from "@app/pages/client/study-schedule/faculties/departments/group/group-schedule/GroupSchedulePage";
import { GroupPage } from "@app/pages/client/study-schedule/faculties/departments/group/GroupPage";
import { SubjectPage } from "@app/pages/client/study-schedule/faculties/departments/subject/SubjectPage";
import { TeachersPage } from "@app/pages/client/study-schedule/faculties/departments/teachers/TeachersPage";
import { FacultiesPage } from "@app/pages/client/study-schedule/faculties/FacultiesPage";
import { ScheduleDisplay } from "@app/pages/client/study-schedule/schedule/schedule-display/ScheduleDisplay";
import { ScheduleFilter } from "@app/pages/client/study-schedule/schedule/schedule-filter/ScheduleFilter";
import { SchedulePage } from "@app/pages/client/study-schedule/schedule/SchedulePage";
import { SettingsPage } from "@app/pages/client/study-schedule/settings/SettingsPage";
import { StudyScheduleIntermediateLayer } from "@app/pages/client/study-schedule/StudyScheduleIntermediateLayer";
import { StudySchedulePage } from "@app/pages/client/study-schedule/StudySchedulePage";

const StudyScheduleRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path={"study-schedule"}
        element={<StudyScheduleIntermediateLayer />}>
        <Route index={true} element={<StudySchedulePage />} />
        <Route path={"building"} element={<BuildingPage />} />
        <Route path={"schedule"} element={<SchedulePage />}>
          <Route index={true} element={<ScheduleFilter />} />
          <Route path={"display"} element={<ScheduleDisplay />} />
        </Route>

        <Route path={"faculties"}>
          <Route index={true} element={<FacultiesPage />} />

          <Route path={":facultyId"}>
            <Route
              index={true}
              element={<Navigate to={"/client/study-schedule/faculties"} />}
            />

            <Route path={":departmentId"} element={<DepartmentsLayout />}>
              <Route index={true} element={<Navigate to={"teachers"} />} />
              <Route path={"teachers"} element={<TeachersPage />} />
              <Route path={"subjects"} element={<SubjectPage />} />
              <Route path={"group"} element={<GroupPage />} />
            </Route>

            <Route
              path={":departmentId/group/schedule"}
              element={<DepartmentsLayout isOutletOnly={true} />}>
              <Route
                index={true}
                element={<Navigate to={"/client/study-schedule/faculties"} />}
              />
              <Route path={":scheduleId"} element={<GroupSchedulePage />} />
            </Route>
          </Route>
        </Route>

        <Route path={"settings"} element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

// eslint-disable-next-line import/no-default-export
export default StudyScheduleRoutes;
