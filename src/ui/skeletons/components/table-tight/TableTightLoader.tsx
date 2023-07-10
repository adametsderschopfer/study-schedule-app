import React from "react";
import {
  StyledTableTightItem,
  StyledTableTightLoader,
  StyledTableTightText,
} from "@ui/skeletons/components/table-tight/styled";
import { SkeletonBox } from "@ui/skeletons/SkeletonBox";

export const TableTightLoader: React.FC = () => {
  return (
    <StyledTableTightLoader>
      <TableTightItemLoader />
      <TableTightItemLoader />
      <TableTightItemLoader />
      <TableTightItemLoader />
      <TableTightItemLoader />
    </StyledTableTightLoader>
  );
};

export const TableTightItemLoader: React.FC = () => (
  <StyledTableTightItem>
    <StyledTableTightText />
    <StyledTableTightText />
    <StyledTableTightText />

    <SkeletonBox width={20} height={20} />
  </StyledTableTightItem>
);
