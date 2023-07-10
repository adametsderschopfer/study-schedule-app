import orderBy from "lodash/orderBy";
import { useMemo } from "react";
import { useAppSelector } from "@store/hooks";
import { RootState } from "@store/rootReducer";
import { TPaginationBase, TSortField } from "@domain/app";

type TUseListProps<T> = {
  originalList: T[];
  selectSearchString?: (state: RootState) => string;
  searchFields?: (keyof T)[];
  pagination?: Partial<TPaginationBase<unknown>>;
  /**
   * example: fieldName|asc
   *
   * fieldName is field from T
   * asc | desc is sort type
   * */
  sortType?: TSortField;
  filter?(list: T[]): T[];
};

type TListPagination = Partial<{
  isFinished: boolean;
}>;

type TUseListReturn<T> = {
  searchString: string;
  list: T[];
  sortType: TSortField | undefined;
  pagination: TListPagination;
};

export const useList = <T>(props: TUseListProps<T>): TUseListReturn<T> => {
  const searchString = useAppSelector(
    props.selectSearchString ? props.selectSearchString : (): string => "",
  );

  return useMemo<TUseListReturn<T>>(() => {
    let list = props.originalList;
    const pagination: TListPagination = {
      isFinished: true,
    };

    if (props.pagination) {
      pagination.isFinished =
        !!searchString.length || props.pagination.total === list.length;
    }

    if (searchString && searchString.length) {
      list = list.filter((item) => {
        if (
          props.searchFields &&
          props.searchFields
            .map((searchField) =>
              new RegExp(searchString, "i").test(
                item[searchField as keyof T] as string,
              ),
            )
            .find((cond) => !!cond)
        ) {
          return item;
        }

        return false;
      });
    }

    if (props.sortType) {
      const { fieldName, order } = props.sortType;

      if (fieldName && order) {
        list = orderBy<T>(list, [fieldName], [order]);
      }
    }

    if (props.filter) {
      list = props.filter(list);
    }

    return {
      searchString,
      list,
      sortType: props.sortType,
      pagination,
    };
  }, [searchString, props]);
};
