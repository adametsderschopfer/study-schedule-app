import styled from "styled-components";
import { EntityPicker } from "@ui/components/entity-picker/EntityPicker";

export const StyledEntityPicker = styled(EntityPicker)`
  margin-bottom: 25px;
`;

export const StyledFacultiesBodyList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledFacultiesBodyListGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledFacultiesBodyListColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
`;
