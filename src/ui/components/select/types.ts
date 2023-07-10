import { TSelectData } from "@domain/app";

export interface SelectBase {
  label?: string | null;
  isOnlyText?: boolean;
  isValid?: boolean;
  isWide?: boolean;
  errorMessage?: string;
  hasEmptyOption?: boolean;
  placeholder?: string | null;
}

export type LoadOptionsResult = {
  options: TSelectOption[];
  hasMore: boolean;
  page: number;
};

export type TSelectOption = TSelectData<unknown>;

export interface SelectProps extends SelectBase {
  options?: TSelectOption[] | never[];

  asyncSearchHandler?(query: string): Promise<TSelectOption[]>;
  isSearchable?: boolean;

  value?: any;
  valueResolver?(
    option: TSelectOption,
    options: TSelectOption[],
  ): unknown | boolean;

  onChange?(option: TSelectOption, options: TSelectOption[]): void;
  noOptionsMessage?(): string;

  isLoading?: boolean;
  loadOptions?(
    page: number,
    options: TSelectOption[],
  ): Promise<LoadOptionsResult>;

  afterLoad?(options: any[]): void;

  infiniteScrollProps?: Record<any, any>;
}
