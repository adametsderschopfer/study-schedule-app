import { theme } from "@config/theme";
import styled from "styled-components";

export const StyledDatePickerWrapper = styled.div`
  width: 100%;

  .react-datepicker {
    max-width: 341px;
    box-shadow: 0 4px 20px rgba(61, 92, 109, 0.1);
    position: relative;
    border-radius: 2px;
    overflow: hidden;
    background: #ffffff;

    &__aria-live {
      display: none;
    }

    &__navigation {
      width: 10px;
      height: 16px;
      background-color: transparent;
      background-repeat: no-repeat;
      border: none;
      cursor: pointer;

      position: absolute;
      top: 18px;

      & > * {
        display: none;
      }

      &--previous {
        background-image: url("data:image/svg+xml,%3Csvg width='10' height='16' viewBox='0 0 10 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 14L2 8L8 2' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
        left: 30px;
      }

      &--next {
        background-image: url("data:image/svg+xml,%3Csvg width='10' height='16' viewBox='0 0 10 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 14L8 8L2 2' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
        right: 30px;
      }
    }

    &__month {
      padding: 0 10px 20px 16px;
      display: flex;
      flex-direction: column;

      &-continer {
      }
    }

    &__header {
      &__dropdown {
        &--scroll {
        }
      }
    }

    &__current-month {
      height: 48px;
      background-color: ${theme.colors.primary};

      display: flex;
      align-items: center;
      justify-content: center;

      color: #ffffff;
      text-transform: capitalize;

      font-family: Roboto, sans-serif;
      font-size: 18px;
      line-height: 22px;
    }

    &__week {
      display: flex;
      flex-direction: row;
    }

    &__day {
      width: 40px;
      height: 40px;

      margin-right: 5px;
      margin-bottom: 5px;

      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.colors.grayText};
      font-size: 16px;
      line-height: 22px;
      cursor: pointer;
      border-radius: 50px;

      transition: all 200ms;

      outline: none;

      &:hover {
        color: #ffffff;
        background-color: ${theme.colors.primary};
      }

      &-names {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-top: 25px;
        padding: 0 16px;
      }

      &-name {
        color: ${theme.colors.grayText};

        width: 40px;
        height: 40px;

        display: flex;
        align-items: center;
        justify-content: center;

        margin-bottom: 5px;
      }

      &--outside-month {
        opacity: 0.5;
      }

      &--selected,
      &--keyboard-selected,
      &--range-start,
      &--range-end {
        cursor: default;

        color: #ffffff;
        border-radius: 50px;
        background-color: ${theme.colors.primary};
      }

      &--in-range:not(&--selected):not(&--range-end):not(&--range-start) {
        background-color: ${theme.colors.grayMenuItemBg};

        &:hover {
          background-color: ${theme.colors.primary};
        }
      }
    }
  }
`;

export const StyledCalendarActiveWeek = styled.div<{
  isActive: boolean;
}>`
  background-color: ${(props): string =>
    props.isActive ? theme.colors.grayMenuItemBg : "initial"};

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${theme.colors.primary};
  }

  &:first-of-type {
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }

  &:last-of-type {
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
  }
`;
