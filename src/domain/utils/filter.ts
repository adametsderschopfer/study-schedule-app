export namespace Filter {
  type TByFieldSubstringParams<T> = {
    fieldName: keyof T;
    substring: string;
  };

  export const byFieldSubstring = <T>(
    list: T[],
    params: TByFieldSubstringParams<T>,
  ): T[] => {
    return Array.from(list).filter((item) =>
      new RegExp(params.substring).test(String(item[params.fieldName])),
    );
  };
}
