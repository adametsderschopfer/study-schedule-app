import { LStorage } from "@utils/LStorage";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { I18N_CURRENT_LANGUAGE_LS_KEY } from "@domain/app";
import { resources } from "./resources";

const currentLang = LStorage.getItem<Record<string, string>>(
  I18N_CURRENT_LANGUAGE_LS_KEY,
);

export const i18n = i18next.use(initReactI18next).init({
  resources,
  lng: currentLang?.language || "ru",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  debug: true,
  interpolation: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    escapeValue: false,
  },
});
