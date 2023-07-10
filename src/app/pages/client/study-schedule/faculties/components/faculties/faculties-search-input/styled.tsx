import styled from "styled-components";
import { Input } from "@ui/components/input/Input";

export const StyledInput = styled(Input).attrs(() => ({
  wrapperStyle: {
    marginRight: 25,
  },
}))`
  margin-right: 25px;
  width: 100%;
`;
