import { LStorage } from "@utils/LStorage";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  StyledLangSwitcherItem,
  StyledLangSwitcherWrapper,
} from "@ui/components/lang/lang-switcher/styled";
import { I18N_CURRENT_LANGUAGE_LS_KEY } from "@domain/app";

export const LangSwitcher: React.FC = () => {
  const {
    i18n: {
      changeLanguage,
      language,
      store: { data },
    },
  } = useTranslation();
  const languages = Object.keys(data);

  function onClick(currentLanguage: (typeof languages)[number]): void {
    changeLanguage(currentLanguage);

    LStorage.setItem(I18N_CURRENT_LANGUAGE_LS_KEY, {
      language: currentLanguage,
    });
  }

  return (
    <StyledLangSwitcherWrapper>
      {languages.map((langItem, index) => (
        <StyledLangSwitcherItem
          isActive={langItem === language}
          key={`LangItemKey_${index}`}
          onClick={(): void => {
            onClick(langItem);
          }}
        >
          {langItem}
        </StyledLangSwitcherItem>
      ))}
    </StyledLangSwitcherWrapper>
  );
};
