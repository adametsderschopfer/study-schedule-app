import { createSelector } from "@reduxjs/toolkit";
import { searchStringCreator } from "@utils/searchStringCreator";
import { RootState } from "@store/rootReducer";
import {
  IGroupEntity,
  IGroupStore,
  TGroupFilter,
  TGroupNamedFilter,
} from "@domain/entity/study-schedule/index";
import { Filter } from "@domain/utils/filter";

export const selectGroupSelf = (state: RootState): IGroupStore =>
  state.modules.studySchedule.orgStructure.group;

export const selectStudyScheduleDepartmentGroup = createSelector(
  selectGroupSelf,
  (group) => ({
    ...group,
    list: group.filters.reduce(
      (list: IGroupEntity[], filterItem: TGroupFilter) =>
        Filter.byFieldSubstring<IGroupEntity>(list, {
          fieldName: filterItem.value.fieldName,
          substring: filterItem.value.substring,
        }),
      group.list,
    ),
  }),
);

export const selectStudyScheduleDepartmentGroupSearchString = (
  state: RootState,
): string =>
  searchStringCreator(
    state.modules.studySchedule.orgStructure.group.searchValue || "",
  );

export const selectStudyScheduleGroupEditCurrent = createSelector(
  selectStudyScheduleDepartmentGroup,
  (state) => state.list.find((item) => item.id === state.editModal.itemId),
);

export const selectStudyScheduleGroupNamedFilters = createSelector(
  selectGroupSelf,
  (group): TGroupNamedFilter =>
    group.filters.reduce<TGroupNamedFilter>((namedFilters, filterItem) => {
      namedFilters[filterItem.value.fieldName] = filterItem;
      return namedFilters;
    }, {}),
);
