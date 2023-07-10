import i18n from "i18next";

export const requiredErrorMessage = (): string =>
  i18n.t("app.validation.cantBeEmpty");
export const lengthMoreThan3ErrorMessage = (): string =>
  i18n.t("app.validation.lengthMoreThan3");
export const invalidEmailErrorMessage = (): string =>
  i18n.t("app.validation.invalidEmail");
export const lengthUpTo128ErrorMessage = i18n.t("app.validation.lengthUpTo128");
export const classroomSeparatedErrorCharacterErrorMessage = i18n.t(
  "app.validation.classroom_separated_error_character",
);
export const classroomSeparatedErrorErrorMessage = i18n.t(
  "app.validation.classroom_separated_error",
);
