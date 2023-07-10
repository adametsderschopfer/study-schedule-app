import { faker } from "@faker-js/faker";
import React from "react";
import {
  StyledScheduleTableBody,
  StyledScheduleTableHead,
  StyledScheduleTableItem,
  StyledScheduleTableWrapper,
} from "@ui/skeletons/components/schedule-table/styled";
import { TextLoader } from "@ui/skeletons/components/TextLoader";

export const ScheduleTableLoader: React.FC = () => {
  return (
    <StyledScheduleTableWrapper>
      <StyledScheduleTableHead>
        <StyledScheduleTableHeadItem />
        <StyledScheduleTableHeadItem />
        <StyledScheduleTableHeadItem />
        <StyledScheduleTableHeadItem />
        <StyledScheduleTableHeadItem />
        <StyledScheduleTableHeadItem />
      </StyledScheduleTableHead>

      <StyledScheduleTableBody>
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
      </StyledScheduleTableBody>
      <StyledScheduleTableBody>
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
      </StyledScheduleTableBody>
      <StyledScheduleTableBody>
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
      </StyledScheduleTableBody>
      <StyledScheduleTableBody>
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
      </StyledScheduleTableBody>
      <StyledScheduleTableBody>
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
      </StyledScheduleTableBody>
      <StyledScheduleTableBody>
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
      </StyledScheduleTableBody>
      <StyledScheduleTableBody>
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
      </StyledScheduleTableBody>
      <StyledScheduleTableBody>
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
      </StyledScheduleTableBody>
      <StyledScheduleTableBody>
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
      </StyledScheduleTableBody>
      <StyledScheduleTableBody>
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
        <StyledScheduleTableBodyItem />
      </StyledScheduleTableBody>
    </StyledScheduleTableWrapper>
  );
};

const StyledScheduleTableHeadItem: React.FC = () => (
  <StyledScheduleTableItem>
    <TextLoader width={50} />
  </StyledScheduleTableItem>
);

const StyledScheduleTableBodyItem: React.FC = () => (
  <StyledScheduleTableItem>
    <TextLoader
      width={faker.datatype.number({
        min: 20,
        max: 130,
      })}
    />
    <TextLoader
      width={faker.datatype.number({
        min: 20,
        max: 130,
      })}
    />
    <TextLoader
      width={faker.datatype.number({
        min: 20,
        max: 70,
      })}
    />
  </StyledScheduleTableItem>
);
