import { useMemo } from "react";
import { useAppSelector } from "@store/hooks";
import { selectUser } from "@store/modules/user/selector";
import { TMenuCategory } from "@domain/menu";
import { headerMenuListByRole } from "@app/router/menu";

type TUseMenuListReturnType =
  | Record<string, TMenuCategory | never>
  | TMenuCategory
  | TMenuCategory[];

export function useMenuList(): Record<string, TMenuCategory | never>;
export function useMenuList(menuType?: string): TMenuCategory;
export function useMenuList(menuType?: string[]): TMenuCategory[];

export function useMenuList(
  menuType?: string | string[],
): TUseMenuListReturnType {
  const { data } = useAppSelector(selectUser);
  const menuList = headerMenuListByRole[data.role as string];

  return useMemo(() => {
    if (!menuList) {
      return [];
    }

    const preFilteredMenuList = Object.entries(menuList)
      .map(([menuKeyType, value]) => {
        if (
          value.roleAccess &&
          value.roleAccess.length &&
          !value.roleAccess.includes(data.role as never)
        ) {
          return [];
        }

        if (value.conditionFn && !value.conditionFn(data)) {
          return [];
        }

        if (value.list && !value.list.length) {
          value.list = value.list.filter((item) => {
            if (item?.conditionFn) {
              return item.conditionFn(data);
            }

            return true;
          });
        }

        return [menuKeyType, value];
      })
      .filter((item) => !!item.length);

    const filteredMenuList = Object.fromEntries(preFilteredMenuList);

    if (typeof menuType === "string") {
      return filteredMenuList[menuType];
    } else if (menuType instanceof Array && menuType.length) {
      return Object.keys(filteredMenuList)
        .map((key: string) => {
          if (menuType.includes(key)) {
            return filteredMenuList[key];
          }

          return undefined;
        })
        .filter((item) => !!item);
    }

    return filteredMenuList;
  }, [menuList, menuType, data]);
}
