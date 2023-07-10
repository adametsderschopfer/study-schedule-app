import i18n from "i18next";

export class ValidateString {
  static exists(str: string): string | boolean | null {
    if (!str) {
      return i18n.t("app.validation.cantBeEmpty") as string;
    }

    return "";
  }

  static lengthMoreThan3(str: string): string | boolean | null {
    if (!(str.length >= 3)) {
      return i18n.t("app.validation.lengthMoreThan3") as string;
    }

    return "";
  }

  static lengthUpTo128(str: string): string | boolean | null {
    if (!(str.length <= 128)) {
      return i18n.t("app.validation.lengthUpTo128") as string;
    }

    return "";
  }
}

export function validatePack(array: (boolean | null | string)[]): string[] {
  return [...array].filter(
    (item) => typeof item === "string" && item.length,
  ) as string[];
}

export function validateDefault128String(str: string): string[] {
  return validatePack([
    ValidateString.exists(str),
    ValidateString.lengthMoreThan3(str),
    ValidateString.lengthUpTo128(str),
  ]);
}

export function validateDefaultString(str: string): string[] {
  return validatePack([
    ValidateString.exists(str),
    ValidateString.lengthMoreThan3(str),
  ]);
}

const MAX_CLASSROOM_AVAILABLE = 500;

export function validateClassroom(str: string): string[] {
  function validateElementsSeparatedByCommas(_str: string): string | null {
    const substrings = _str.split(",");

    for (let substring of substrings) {
      substring = substring.trim();

      if (substring.includes("-")) {
        if (!/^\d+-\d+$/.test(substring)) {
          return i18n.t("app.validation.classroom_separated_error_character");
        }

        const left = parseInt(substring.split("-")[0]);
        const right = parseInt(substring.split("-")[1]);

        if (left <= 0) {
          return i18n.t("app.validation.invalidFieldValue", {
            allow: 1,
          });
        }

        if (right <= 0) {
          return i18n.t("app.validation.invalidFieldValue", {
            allow: 1,
          });
        }

        if (right - left > MAX_CLASSROOM_AVAILABLE) {
          return i18n.t("app.validation.invalidFieldValueWithMax", {
            value: `${left}-${right}`,
            allow: MAX_CLASSROOM_AVAILABLE,
          });
        }

        if (left >= right) {
          return i18n.t("app.validation.incorrectFieldValue");
        }
      } else {
        if (!/^[a-zA-Zа-яА-Я\d\s]+$/.test(substring)) {
          return i18n.t("app.validation.incorrectFieldValue");
        }

        if (
          /\d+/.test(substring) &&
          /[a-zA-Z]+/.test(substring) &&
          /\s+/.test(substring) &&
          /-/.test(substring)
        ) {
          return i18n.t("app.validation.classroom_separated_error");
        }
      }
    }

    return null;
  }

  return validatePack([
    ValidateString.exists(str),
    validateElementsSeparatedByCommas(str),
  ]);
}
