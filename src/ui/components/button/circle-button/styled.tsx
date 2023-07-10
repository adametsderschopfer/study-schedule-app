import { theme } from "@config/theme";
import styled from "styled-components";
import { Button } from "@ui/components/button/Button";

export const StyledCircleButton = styled(Button)`
  width: 30px;
  height: 30px;

  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  border-radius: 50px;
  background-color: #ffffff;
  transition: 200ms;

  color: ${theme.colors.primary};
  border: 2px solid #ffffff;

  cursor: pointer;

  &:hover {
    transform: scale(1.03);

    background-color: ${theme.colors.primary};
    color: #ffffff;
    border-color: #ffffff;
  }
`;
