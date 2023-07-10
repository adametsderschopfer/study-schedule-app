import { theme } from "@config/theme";
import styled, { StyledComponentPropsWithRef } from "styled-components";
import { RemoveButton } from "@ui/components/remove-button/RemoveButton";

export const StyledSettingsModesLessonsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;

  width: 100%;
  height: 100%;
`;

export const StyledSettingsModesLessonsHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;

  width: 100%;

  background-color: ${theme.colors.primary};
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;

export const StyledSettingsModesLessonsHeadTitle = styled.div`
  line-height: 26px;
  font-size: 24px;
  font-weight: 500;
  margin-right: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;

  color: #ffffff;
`;

export const StyledSettingsModesLessonsItems = styled.div<
  StyledComponentPropsWithRef<any>
>`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 100%;
`;

export const StyledSettingsModesLessonsItemRemoveButton = styled(RemoveButton)`
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  border-radius: 50px;
  background-color: ${theme.colors.lightGray};
  padding: 0;

  color: #ffffff;

  border: none;
  cursor: pointer;
  transition: 100ms;

  &:hover {
    transform: scale(1.03);
    background-color: ${theme.colors.error};
  }
`;

export const StyledSettingsModesLessonsItem = styled.div<{
  isLoading: boolean | undefined;
  isNew: boolean | undefined;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;

  padding: 24px 24px;
  transition: 200ms;

  &:hover {
    background-color: ${(props): string =>
      props.isLoading ? "transparent" : "#f5f6f6"};
  }

  &::before {
    display: ${(props): string => (props.isLoading ? "block" : "none")};
    content: "";

    z-index: 10;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(245, 246, 246, 0.59);
  }
`;

export const StyledSettingsModesLessonsItemTitle = styled.div`
  color: ${theme.colors.primary};
  font-size: 24px;
  line-height: 22px;
  font-weight: 500;

  margin-right: 5px;
`;

export const StyledSettingsModesLessonsItemTimeGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  max-width: 190px;

  span {
    margin: 5px;
  }

  input {
    text-align: center;
  }
`;
