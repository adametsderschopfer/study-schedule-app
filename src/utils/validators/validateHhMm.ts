export const validateHhMm = (value: string): boolean => {
  if (!value) {
    return false;
  }

  const splitValue = value.split(":");

  if (splitValue.length !== 2) {
    return false;
  }

  return !(splitValue[0].length !== 2 || splitValue[1].length !== 2);
};
