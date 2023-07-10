export type TypeSelectorItem<T = any> = {
  tooltipLabel?: string;
  name: string;
  value: T;
};

type TypeSelectorCurrentValueCb<T> = (item: TypeSelectorItem<T>) => boolean;

export type TypeSelectorProps<T = any> = {
  currentValue?: T | TypeSelectorCurrentValueCb<T>;
  items: TypeSelectorItem<T>[];
  onItemSelect(item: TypeSelectorItem<T>): void;
};
