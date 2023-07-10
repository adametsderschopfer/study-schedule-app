import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/components/button/Button";
import { StyledErrorMessageText } from "@ui/components/error-message/styled";
import { StyledFormInput } from "@ui/components/input/Input";
import { LangSwitcher } from "@ui/components/lang/lang-switcher/LangSwitcher";
import { Logo } from "@ui/components/logo/Logo";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { submitLoginAction } from "@store/modules/auth/sections/login/actions";
import { selectAuthLogin } from "@store/modules/auth/sections/login/selector";
import { LoginDTO } from "@domain/entity/auth/dto/login-dto";
import { LoginFormFields } from "@domain/entity/auth/index";
import {
  invalidEmailErrorMessage,
  lengthMoreThan3ErrorMessage,
  requiredErrorMessage,
} from "@app/i18n/defaults";
import {
  StyledLogin,
  StyledLoginFields,
  StyledLoginForm,
  StyledLoginHead,
  StyledLoginIcon,
} from "@app/pages/auth/login/styled";

const validationScheme = yup.object().shape({
  email: yup
    .string()
    .required(requiredErrorMessage)
    .min(3, lengthMoreThan3ErrorMessage)
    .email(invalidEmailErrorMessage),
  password: yup
    .string()
    .required(requiredErrorMessage)
    .min(3, lengthMoreThan3ErrorMessage),
});

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const login = useAppSelector(selectAuthLogin);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormFields>({
    resolver: yupResolver(validationScheme),
  });

  const isDisabled = login.loading === "loading";

  const onSubmit = (data: LoginDTO): void => {
    dispatch(submitLoginAction(data));
  };

  return (
    <StyledLogin>
      <StyledLoginHead>
        <StyledLoginIcon>
          <Logo />
        </StyledLoginIcon>

        <LangSwitcher />
      </StyledLoginHead>

      <StyledLoginForm onSubmit={handleSubmit(onSubmit)}>
        <StyledLoginFields>
          <StyledFormInput
            {...register("email")}
            label={t("app.pages.Login.fieldEmailTitle")}
            placeholder={t("app.pages.Login.fieldEmailPlaceholder")}
            isWide={true}
            disabled={isDisabled}
            type={"email"}
            isValid={!errors["email"]}
            errorMessage={errors["email"]?.message}
            id={"email"}
            autoComplete={"email"}
          />

          <StyledFormInput
            {...register("password")}
            label={t("app.pages.Login.fieldPasswordTitle")}
            placeholder={t("app.pages.Login.fieldPasswordPlaceholder")}
            isWide={true}
            disabled={isDisabled}
            type={"password"}
            isValid={!errors["password"]}
            errorMessage={errors["password"]?.message}
            id={"password"}
            autoComplete={"current-password"}
          />
        </StyledLoginFields>

        <Button mode={"wide"} type={"submit"} disabled={isDisabled}>
          {t("app.pages.Login.submitButton")}
        </Button>

        {login.loading === "error" && (
          <StyledErrorMessageText>
            {t("app.pages.Login.submitError")}
          </StyledErrorMessageText>
        )}
      </StyledLoginForm>
    </StyledLogin>
  );
};
