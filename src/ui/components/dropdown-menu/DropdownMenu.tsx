import * as React from "react";
import { useCallback, useState } from "react";
import { ClickAwayListener } from "@ui/components/click-away-listener/ClickAwayListener";
import {
  StyledDropdownMenuContainer,
  StyledDropdownMenuList,
  StyledDropdownMenuListItem,
  StyledDropdownMenuTrigger,
} from "@ui/components/dropdown-menu/styled";
import {
  DropdownMenuItem,
  DropdownMenuProps,
} from "@ui/components/dropdown-menu/types";

export const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  const [isOpened, setOpened] = useState(false);

  const onClick = useCallback(
    (event: any) => {
      event.preventDefault();
      event.stopPropagation();

      setOpened(!isOpened);
    },
    [isOpened],
  );

  function onItemClick(
    event: React.MouseEvent<HTMLButtonElement>,
    item: DropdownMenuItem,
  ): void {
    event.stopPropagation();

    if (item.props?.onClick) {
      item.props.onClick(event);
    }

    setOpened(false);
  }

  if (!props.items?.length) {
    return null;
  }

  return (
    <StyledDropdownMenuContainer>
      <StyledDropdownMenuTrigger
        triggerBg={props.triggerBg}
        triggerSpanBg={props.triggerSpanBg}
        triggerSpanBgHover={props.triggerSpanBgHover}
        onClick={onClick}
      >
        <span />
        <span />
        <span />
      </StyledDropdownMenuTrigger>

      <ClickAwayListener
        onClickAway={(): void => {
          setOpened(false);
        }}
      >
        <StyledDropdownMenuList isOpened={isOpened} position={props.position}>
          {props.items.map((menuItem, index) => (
            <StyledDropdownMenuListItem
              {...menuItem.props}
              as={menuItem.component}
              key={`DropdownMenuListItem_${index}`}
              onClick={(event: React.MouseEvent<HTMLButtonElement>): void =>
                onItemClick(event, menuItem)
              }
            >
              {menuItem.name}
            </StyledDropdownMenuListItem>
          ))}
        </StyledDropdownMenuList>
      </ClickAwayListener>
    </StyledDropdownMenuContainer>
  );
};

DropdownMenu.defaultProps = {
  position: "bottom-left",
} as DropdownMenuProps;
