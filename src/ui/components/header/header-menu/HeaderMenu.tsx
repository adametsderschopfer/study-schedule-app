import React from "react";
import { useTranslation } from "react-i18next";
import {
  StyledHeaderMenuItem,
  StyledHeaderMenuList,
} from "@ui/components/header/header-menu/styled";
import { TMenuItem } from "@domain/menu";
import { useMenuList } from "@app/hooks/useMenuList";

export const HeaderMenu: React.FC = () => {
  const { t } = useTranslation();
  const menuItems = useMenuList("header");

  if (!menuItems || !menuItems?.list) {
    return null;
  }

  return (
    <StyledHeaderMenuList>
      {menuItems.list.map((item: TMenuItem, index: number) => (
        <StyledHeaderMenuItem
          to={item.linkTo}
          key={`header_menu_item_${index}`}>
          {item.langVariable ? t(item.langVariable) : item.title}
        </StyledHeaderMenuItem>
      ))}
    </StyledHeaderMenuList>
  );
};
