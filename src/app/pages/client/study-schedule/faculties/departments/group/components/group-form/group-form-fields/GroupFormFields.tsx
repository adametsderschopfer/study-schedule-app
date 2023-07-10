import React from "react";
import { CodeError } from "@ui/components/error-view/error-view-variants/CodeError";
import { useAppSelector } from "@store/hooks";
import { selectStudyScheduleGroupEditCurrent } from "@store/modules/study-schedule/sections/faculties/sections/group/selector";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { EStudyScheduleTypes } from "@domain/entity/study-schedule/index";
import { GroupFormFieldsCollege } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/group-form-fields/group-form-fields-college/GroupFormFieldsCollege";
import { GroupFormFieldsSchool } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/group-form-fields/group-form-fields-school/GroupFormFieldsSchool";
import { GroupFormFieldsUniversity } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/group-form-fields/group-form-fields-university/GroupFormFieldsUniversity";
import { GroupFormFieldsProps } from "@app/pages/client/study-schedule/faculties/departments/group/components/group-form/types";

export const GroupFormFields: React.FC<GroupFormFieldsProps> = (props) => {
  const { type: moduleType } = useAppSelector(selectStudySchedule);
  const currentEditGroup = useAppSelector(selectStudyScheduleGroupEditCurrent);

  switch (moduleType) {
    case EStudyScheduleTypes.UNIVERSITY: {
      return (
        <GroupFormFieldsUniversity
          currentEditGroup={currentEditGroup}
          {...props}
        />
      );
    }

    case EStudyScheduleTypes.COLLEGE: {
      return (
        <GroupFormFieldsCollege
          currentEditGroup={currentEditGroup}
          {...props}
        />
      );
    }

    case EStudyScheduleTypes.SCHOOL: {
      return (
        <GroupFormFieldsSchool currentEditGroup={currentEditGroup} {...props} />
      );
    }
  }

  return <CodeError />;
};
