import { theme } from "@config/theme";
import styled from "styled-components";
import { Button } from "@ui/components/button/Button";
import { StyledText } from "@ui/components/text/Text";

export const StyledBaseModalHead = styled.div`
  background-color: ${theme.colors.primary};
  padding: 24px;
  height: 70px;
  color: #ffffff;

  position: relative;
`;

export const StyledBaseModalHeadTitle = styled.div`
  font-size: 24px;
  line-height: 22px;
  font-weight: 500;
  text-align: center;
  width: 100%;

  padding: 0 15px;
`;

export const StyledBaseModalHeadClose = styled.div`
  position: absolute;
  right: 15px;
  top: 21px;

  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: 200ms;

  color: #ffffff;
  border-radius: 50px;

  &:hover {
    color: ${theme.colors.primary};
    background-color: #ffffff;
  }
`;

export const StyledBaseModalBody = styled.div`
  padding: 56px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const StyledBaseModalBodyLoadingWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledRemovePromptDeleteButton = styled(Button)`
  margin-bottom: 25px;
`;

export const StyledRemovePromptTitle = styled(StyledText)`
  font-weight: 500;
  margin-bottom: 25px;
  text-align: center;
  color: ${theme.colors.primary};
  line-height: 60px;
`;

export const StyledRemovePromptButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledCancelButton = styled(Button).attrs((props) => ({
  isOutline: true,
  mode: "wide",
  type: "button",

  ...props,
}))`
  margin-bottom: 25px;
`;
