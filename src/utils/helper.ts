export async function waitDelay(milliSeconds: number): Promise<undefined> {
  return new Promise<undefined>((fulfilled) => {
    setTimeout(() => {
      fulfilled(undefined);
    }, milliSeconds);
  });
}

export const getEnumValues = (array: Record<any, any>): string[] =>
  Object.values(array).filter((item) => typeof item === "string");

export const num2word = (
  number: number,
  titles = [" - 1", " - 2", " - 3"],
): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]
  ];
};
