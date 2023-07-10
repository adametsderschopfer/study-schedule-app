import en from "date-fns/locale/en-GB";
import ru from "date-fns/locale/ru";
import React from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { useTranslation } from "react-i18next";
import { StyledDatePickerWrapper } from "@ui/components/date-picker/styled";

export const DatePicker: React.FC<ReactDatePickerProps<"", true>> = (props) => {
  const { i18n } = useTranslation();

  return (
    <StyledDatePickerWrapper>
      <ReactDatePicker
        disabledKeyboardNavigation={true}
        calendarStartDay={1}
        locale={i18n.language === "ru" ? ru : en}
        inline={true}
        {...props}
      />
    </StyledDatePickerWrapper>
  );
};
