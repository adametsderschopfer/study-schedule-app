export const debounceAsync = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
  milliseconds = 300,
  onBeforeCall?: () => void,
  // eslint-disable-next-line @typescript-eslint/ban-types
): Function => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any[]) =>
    new Promise((fulfilled) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(async () => {
        if (onBeforeCall) {
          onBeforeCall();
        }

        fulfilled(await callback(...args));
      }, milliseconds);
    });
};
