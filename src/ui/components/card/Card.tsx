import { theme } from "@config/theme";
import React from "react";
import {
  StyledCardBody,
  StyledCardBodyDescription,
  StyledCardBodySubText,
  StyledCardBodyText,
  StyledCardHeader,
  StyledCardHeaderTitle,
  StyledCardWrapper,
} from "@ui/components/card/styled";
import { DropdownMenu } from "@ui/components/dropdown-menu/DropdownMenu";
import { DropdownMenuProps } from "@ui/components/dropdown-menu/types";

interface CardProps {
  headerTitle: string;
  text: string;
  subText?: string;
  description?: string;
  onClick?: React.MouseEventHandler | undefined;

  dropdownMenu?: DropdownMenuProps;
}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <StyledCardWrapper onClick={props.onClick}>
      <StyledCardHeader>
        <StyledCardHeaderTitle>{props.headerTitle}</StyledCardHeaderTitle>

        {props.dropdownMenu && (
          <DropdownMenu
            {...props.dropdownMenu}
            position={"bottom-left"}
            triggerBg={"#ffffff"}
            triggerSpanBg={"#ffffff"}
            triggerSpanBgHover={theme.colors.primary}
          />
        )}
      </StyledCardHeader>

      <StyledCardBody>
        <StyledCardBodyText>{props.text}</StyledCardBodyText>

        {props.subText && (
          <StyledCardBodySubText>{props.subText}</StyledCardBodySubText>
        )}

        <StyledCardBodyDescription>
          {props.description}
        </StyledCardBodyDescription>
      </StyledCardBody>
    </StyledCardWrapper>
  );
};
