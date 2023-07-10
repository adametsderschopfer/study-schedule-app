import { debounceAsync } from "@utils/debounce";
import { searchStringCreator } from "@utils/searchStringCreator";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { toast } from "react-toastify";
import { ClickAwayListener } from "@ui/components/click-away-listener/ClickAwayListener";
import { BottomArrowIcon } from "@ui/components/icons/BottomArrowIcon";
import { StyledLoaderIndicator } from "@ui/components/loader-indicator/index";
import { SelectBase } from "@ui/components/select/select-base/SelectBase";
import {
  StyledSelect,
  StyledSelectArrowWrapper,
  StyledSelectContainer,
  StyledSelectInput,
  StyledSelectLoader,
  StyledSelectOption,
  StyledSelectOptions,
} from "@ui/components/select/styled";
import { SelectProps, TSelectOption } from "@ui/components/select/types";
import { TSelectData } from "@domain/app";

export const Select: React.FC<SelectProps> = (_props) => {
  const { t } = useTranslation();

  const isValid = typeof _props.isValid === "boolean" ? _props.isValid : true;
  const props = {
    ..._props,
    isValid,
  };

  const scrollParentRef = useRef<HTMLDivElement>();

  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [isInitialLoad, setInitialLoad] = useState<boolean>(
    props?.infiniteScrollProps?.initialLoad,
  );
  const [page, setPage] = useState<number>(
    props?.infiniteScrollProps?.pageStart ?? 1,
  );
  const [isShown, setIsShown] = useState<boolean>(false);
  const [currentOption, setCurrentOption] = useState<
    TSelectData<unknown> | undefined
  >(undefined);
  const [options, setOptions] = useState<TSelectData<unknown>[] | never[]>(
    props.options || [],
  );
  const [tempOptions, setTempOptions] = useState<
    TSelectData<unknown>[] | never[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(
    props.infiniteScrollProps?.hasMore,
  );

  const loadMoreOptions = useCallback(async () => {
    if (!hasMore || isLoading) {
      return;
    }

    setInitialLoad(false);
    setIsLoading(true);

    if (typeof props.loadOptions === "function") {
      try {
        const loadedInfo = await props.loadOptions(page, options);

        setHasMore(loadedInfo.hasMore);
        setPage(loadedInfo.page + 1);

        if (loadedInfo.options) {
          setOptions((prevOptions) => {
            const _options = [...prevOptions, ...loadedInfo.options];

            queueMicrotask(() => {
              if (typeof props.afterLoad === "function") {
                props.afterLoad(_options);
              }
            });

            return _options;
          });
        }
      } catch (error) {
        setHasMore(false);
        console.error(error);
        toast.error(t("app.errors.SELECT_LOAD_FAILED"));
      }

      setCurrentOption(options.find((item) => getActive(item)));
    }

    setIsLoading(false);
  }, [hasMore, props, options, isLoading, page]);

  const handleSelect = useCallback(
    (option: TSelectData<unknown>) => {
      if (props.onChange) {
        props.onChange(option, options);
      }

      if (typeof option.value === "undefined") {
        setCurrentOption(undefined);
      } else {
        setCurrentOption(option);
      }

      setIsShown(false);
    },
    [options, props],
  );

  const getActive = useCallback(
    (item: TSelectData<unknown>): boolean => {
      if (typeof props.valueResolver === "function") {
        try {
          const result = props.valueResolver(item, options);

          if (typeof result === "boolean") {
            return result;
          } else {
            return item.value === result;
          }
        } catch (error) {
          console.warn(error);
          return false;
        }
      }

      return false;
    },
    [options, props],
  );

  const searchValueFilterOptions = useCallback(
    (item: TSelectData<any>): boolean => {
      if (!!props.asyncSearchHandler || !searchValue || !searchValue?.length) {
        return true;
      }

      return !!item.label.toLowerCase().match(searchStringCreator(searchValue));
    },
    [searchValue, props.asyncSearchHandler],
  );

  const onBeforeCall = (): void => {
    setIsLoading(true);
    setHasMore(false);
    setTempOptions([]);
  };
  const handleAsyncSearchDebounce = useMemo(
    () =>
      debounceAsync(
        props.asyncSearchHandler || ((): 0 => 0),
        500,
        onBeforeCall,
      ),
    [props.asyncSearchHandler],
  );

  const handleInputSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearchValue(event.target.value);

    if (props.asyncSearchHandler) {
      if (event.target.value.length < 3) {
        setHasMore(true);
        setTempOptions([]);
        return;
      }

      handleAsyncSearchDebounce(event.target.value).then(
        (options: TSelectOption[]) => {
          setIsLoading(false);

          if (!options.length) {
            setTempOptions([
              {
                value: undefined,
                label: t("app.select.empty"),
              },
            ]);
            return;
          }

          setTempOptions(options);
        },
      );
    }
  };

  useEffect(() => {
    setOptions(props.options || []);
  }, [props.options]);

  useEffect(() => {
    if (searchValue?.length) {
      setInputValue(searchValue);
    } else if (currentOption) {
      setInputValue(currentOption.label);
    } else {
      setInputValue("");
    }
  }, [searchValue, currentOption, inputValue]);

  useEffect(() => {
    if (!props.value) {
      setCurrentOption(options.find((item) => getActive(item)));
    }
  }, [props, options]);

  useEffect(() => {
    const option = options.find((item) => getActive(item));

    if (option) {
      setCurrentOption(option);
    } else if (
      props.value &&
      typeof props.value === "object" &&
      "label" in props.value &&
      !!props.value.label
    ) {
      setCurrentOption(props.value);
    } else {
      if (currentOption?.value) {
        return;
      }

      setCurrentOption(undefined);
    }
  }, [props.value, options, currentOption]);

  useEffect(() => {
    if (props.valueResolver && !currentOption && !props.value) {
      setCurrentOption(options.find((item) => getActive(item)));
    }
  }, [options, currentOption, props.valueResolver, props.value]);

  useEffect(() => {
    if (scrollParentRef.current) {
      scrollParentRef.current?.scrollTo({
        top: 0,
      });
    }

    if (!isShown) {
      setTempOptions([]);
      setSearchValue(null);
    }
  }, [isShown]);

  const searchFilterList = options.filter(searchValueFilterOptions);

  return (
    <SelectBase {...props}>
      <ClickAwayListener
        onClickAway={(): void => {
          setIsShown(false);
        }}>
        <StyledSelect isWide={props.isWide}>
          <StyledSelectContainer
            isValid={isValid}
            isOnlyText={props.isOnlyText}
            onClick={(): void => {
              setIsShown(!isShown);
            }}>
            <StyledSelectInput
              type={"text"}
              value={inputValue}
              disabled={!props.isSearchable}
              onChange={handleInputSearchChange}
              placeholder={
                isLoading
                  ? (t("app.select.loading") as string)
                  : (props.placeholder as string)
              }
            />

            {isLoading && <StyledLoaderIndicator />}

            <StyledSelectArrowWrapper>
              <BottomArrowIcon />
            </StyledSelectArrowWrapper>
          </StyledSelectContainer>

          <StyledSelectOptions
            isShown={isShown}
            ref={scrollParentRef as React.MutableRefObject<HTMLDivElement>}>
            <InfiniteScroll
              pageStart={1}
              getScrollParent={(): HTMLDivElement =>
                scrollParentRef.current as HTMLDivElement
              }
              useWindow={false}
              loader={
                isLoading ? (
                  <StyledSelectLoader key={Date.now()}>
                    <StyledLoaderIndicator />
                  </StyledSelectLoader>
                ) : undefined
              }
              loadMore={loadMoreOptions}
              hasMore={hasMore}
              initialLoad={isInitialLoad}
              {...props.infiniteScrollProps}>
              {!isLoading && !options.length ? (
                props.noOptionsMessage &&
                typeof props.noOptionsMessage === "function" ? (
                  <StyledSelectOption
                    isActive={false}
                    onClick={(): void => {
                      handleSelect({
                        value: undefined,
                        label: "",
                      });
                    }}>
                    {props.noOptionsMessage()}
                  </StyledSelectOption>
                ) : (
                  <StyledSelectOption
                    isActive={false}
                    onClick={(): void => {
                      handleSelect({
                        value: undefined,
                        label: "",
                      });
                    }}>
                    {t("app.select.empty")}
                  </StyledSelectOption>
                )
              ) : null}

              {!isLoading && props.hasEmptyOption && options.length ? (
                <StyledSelectOption
                  isActive={getActive({
                    value: undefined,
                    label: "",
                  })}
                  onClick={(): void => {
                    handleSelect({
                      value: undefined,
                      label: "",
                    });
                  }}>
                  {t("app.select.nothing")}
                </StyledSelectOption>
              ) : null}

              {(tempOptions.length ? tempOptions : searchFilterList).map(
                (item, index) => (
                  <StyledSelectOption
                    key={`Select_Item_${index}`}
                    isActive={getActive(item)}
                    onClick={(): void => {
                      handleSelect(item);
                    }}>
                    {item.label || `Not defined - ${index}`}
                  </StyledSelectOption>
                ),
              )}

              {!isLoading && !searchFilterList.length && searchValue?.length ? (
                <StyledSelectOption
                  isActive={getActive({
                    value: undefined,
                    label: "",
                  })}
                  onClick={(): void => {
                    handleSelect({
                      value: undefined,
                      label: "",
                    });
                  }}>
                  {t("app.select.empty")}
                </StyledSelectOption>
              ) : null}
            </InfiniteScroll>
          </StyledSelectOptions>
        </StyledSelect>
      </ClickAwayListener>
    </SelectBase>
  );
};
