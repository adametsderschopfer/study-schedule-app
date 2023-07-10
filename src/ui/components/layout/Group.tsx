import styled from "styled-components";

export const StyledFieldGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  & div:first-child {
    margin-right: 12px;
    width: 100%;
  }

  & div:last-child {
    margin-left: 12px;
    width: 100%;
  }
`;
