import React from "react";
import { Breadcrumbs } from "@ui/components/breadcrumbs/Breadcrumbs";
import { useAppSelector } from "@store/hooks";
import { selectDetailDepartmentBreadcrumbs } from "@store/modules/study-schedule/sections/faculties/sections/department/selector";

export const DepartmentsHeaderBreadcrumbs: React.FC = () => {
  const breadcrumbs = useAppSelector(selectDetailDepartmentBreadcrumbs);

  return <Breadcrumbs crumbs={breadcrumbs} />;
};
