import { theme } from "@config/theme";
import React from "react";
import { LineItemLoader } from "@ui/skeletons/components/line-item/LineItemLoader";
import { useAppSelector } from "@store/hooks";
import { selectStudyScheduleFaculty } from "@store/modules/study-schedule/sections/faculties/selector";
import {
  IDepartmentEntity,
  IFacultyEntity,
} from "@domain/entity/study-schedule/index";
import { useMediaQuery } from "@app/hooks/useMediaQuery";
import { FacultiesBodyItem } from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-body/faculties-body-item/FacultiesBodyItem";
import {
  StyledFacultiesBodyList,
  StyledFacultiesBodyListColumn,
  StyledFacultiesBodyListGroup,
} from "@app/pages/client/study-schedule/faculties/components/faculties/faculties-body/styled";

export const FacultiesBodyItems: React.FC<{
  list: (IFacultyEntity | IDepartmentEntity)[];
}> = (props) => {
  const faculty = useAppSelector(selectStudyScheduleFaculty);
  const isMatchedWidth = useMediaQuery(
    `(max-width: ${theme.breakPoints.desktop}px)`,
  );

  if (isMatchedWidth || props.list.length === 1) {
    return (
      <StyledFacultiesBodyList>
        {props.list.map((facultyItem, index) => (
          <FacultiesBodyItem key={`faculty_item_${index}`} {...facultyItem} />
        ))}

        {faculty.loading === "still-loading" && (
          <>
            <LineItemLoader />
            <LineItemLoader />
            <LineItemLoader />
          </>
        )}
      </StyledFacultiesBodyList>
    );
  }

  return (
    <StyledFacultiesBodyListGroup>
      <StyledFacultiesBodyListColumn>
        {props.list.map((facultyItem, index) =>
          index + 1 <= Math.round(props.list.length / 2) ? (
            <FacultiesBodyItem key={`faculty_item_${index}`} {...facultyItem} />
          ) : null,
        )}

        {faculty.loading === "still-loading" && (
          <>
            <LineItemLoader />
            <LineItemLoader />
            <LineItemLoader />
          </>
        )}
      </StyledFacultiesBodyListColumn>

      <StyledFacultiesBodyListColumn>
        {props.list.map((facultyItem, index) =>
          index >= Math.round(props.list.length / 2) ? (
            <FacultiesBodyItem key={`faculty_item_${index}`} {...facultyItem} />
          ) : null,
        )}

        {faculty.loading === "still-loading" && (
          <>
            <LineItemLoader />
          </>
        )}
      </StyledFacultiesBodyListColumn>
    </StyledFacultiesBodyListGroup>
  );
};
