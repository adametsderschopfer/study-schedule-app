import React from "react";
import { useTranslation } from "react-i18next";
import {
  StyledSidebarMenuCategory,
  StyledSidebarMenuCategoryNative,
  StyledSidebarMenuItem,
  StyledSidebarMenuList,
  StyledSidebarMenuSubList,
  StyledSidebarMenuWrapper,
} from "@ui/components/sidebar/sidebar-menu/styled";
import { useMenuList } from "@app/hooks/useMenuList";

export const SidebarMenu: React.FC = () => {
  const { t } = useTranslation();
  const menuCategories = useMenuList([
    "StudySchedule",
    "InfoPanel",
    "DigitalDirectory",
    "DigitalSignage",
  ]);

  return (
    <StyledSidebarMenuWrapper>
      {menuCategories.map((category, index) => (
        <StyledSidebarMenuList key={`Menu_Category_${index}`}>
          {category.isNativeAnchor ? (
            <StyledSidebarMenuCategoryNative
              href={category.linkTo ? category.linkTo : "#"}>
              <span>
                {category.langVariable
                  ? t(category.langVariable)
                  : category.title}
              </span>
            </StyledSidebarMenuCategoryNative>
          ) : (
            <StyledSidebarMenuCategory
              to={category.linkTo ? category.linkTo : "#"}
              {...category.linkArgs}>
              <span>
                {category.langVariable
                  ? t(category.langVariable)
                  : category.title}
              </span>
            </StyledSidebarMenuCategory>
          )}

          {category.list?.length ? (
            <StyledSidebarMenuSubList>
              {category.list.map((navItem, navIndex) => (
                <StyledSidebarMenuItem
                  to={navItem.linkTo}
                  key={`Menu_Category_${index}_Item-${navIndex}`}>
                  {navItem.icon}
                  <span>
                    {navItem.langVariable
                      ? t(navItem.langVariable)
                      : navItem.title}
                  </span>
                </StyledSidebarMenuItem>
              ))}
            </StyledSidebarMenuSubList>
          ) : null}
        </StyledSidebarMenuList>
      ))}
    </StyledSidebarMenuWrapper>
  );
};
