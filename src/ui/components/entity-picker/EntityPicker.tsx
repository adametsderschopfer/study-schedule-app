import React, { useState } from "react";
import { DropdownMenu } from "@ui/components/dropdown-menu/DropdownMenu";
import { DropdownMenuProps } from "@ui/components/dropdown-menu/types";
import {
  StyledEntityPicker,
  StyledEntityPickerIcon,
  StyledEntityPickerList,
  StyledEntityPickerListItem,
  StyledEntityPickerListItemAddTitle,
  StyledEntityPickerListItemTitle,
  StyledEntityPickerTrigger,
  StyledEntityPickerTriggerDropdownMenu,
  StyledEntityPickerTriggerTitle,
} from "@ui/components/entity-picker/styled";
import { BottomArrowIcon } from "@ui/components/icons/BottomArrowIcon";

export type EntityPickerItem = {
  name: string;
  dropdownMenu?: DropdownMenuProps;
};

interface EntityPickerProps {
  className?: string;
  title: string;
  items?: EntityPickerItem[];
  useInline?: boolean;

  onClick?(): void;

  entityAction?: (item: any) => void;

  addAction?: {
    onAddClick(): void;
    name: string;
  };

  dropdownMenu?: DropdownMenuProps;
}

export const EntityPicker: React.FC<EntityPickerProps> = (props) => {
  const [isShown, setShown] = useState<boolean>(false);

  return (
    <StyledEntityPicker className={`entity-picker ${props.className}`}>
      <StyledEntityPickerTrigger
        onClick={(event: React.MouseEvent): void => {
          if (props.useInline && props.onClick) {
            props.onClick();
            return;
          }

          if (
            (event.target as HTMLElement).closest(".entity-picker") &&
            !props.useInline
          ) {
            setShown(!isShown);
          }
        }}>
        <StyledEntityPickerIcon useInline={props.useInline} isShown={isShown}>
          <BottomArrowIcon />
        </StyledEntityPickerIcon>

        <StyledEntityPickerTriggerTitle isShown={isShown}>
          {props.title}
        </StyledEntityPickerTriggerTitle>

        <StyledEntityPickerTriggerDropdownMenu>
          {props.dropdownMenu && <DropdownMenu {...props.dropdownMenu} />}
        </StyledEntityPickerTriggerDropdownMenu>
      </StyledEntityPickerTrigger>

      <StyledEntityPickerList isShown={isShown}>
        {props.addAction ? (
          <StyledEntityPickerListItem onClick={props.addAction.onAddClick}>
            <StyledEntityPickerIcon>
              <svg
                width={"18"}
                height={"19"}
                viewBox={"0 0 18 19"}
                fill={"none"}
                xmlns={"http://www.w3.org/2000/svg"}>
                <path
                  d={"M1 9.5L17 9.5"}
                  stroke={"white"}
                  strokeWidth={"2"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                />
                <path
                  d={"M9 17.5L9 1.5"}
                  stroke={"white"}
                  strokeWidth={"2"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                />
              </svg>
            </StyledEntityPickerIcon>

            <StyledEntityPickerListItemAddTitle>
              {props.addAction.name}
            </StyledEntityPickerListItemAddTitle>
          </StyledEntityPickerListItem>
        ) : null}

        {!props.useInline && props.items?.length
          ? props.items.map((item, index) => (
              <StyledEntityPickerListItem
                onClick={(): void => {
                  props.entityAction ? props.entityAction(item) : undefined;
                }}
                key={`EntityPickerListItem_${index}`}>
                <StyledEntityPickerListItemTitle>
                  {item.name}
                </StyledEntityPickerListItemTitle>

                <StyledEntityPickerTriggerDropdownMenu>
                  {item.dropdownMenu && <DropdownMenu {...item.dropdownMenu} />}
                </StyledEntityPickerTriggerDropdownMenu>
              </StyledEntityPickerListItem>
            ))
          : null}
      </StyledEntityPickerList>
    </StyledEntityPicker>
  );
};
