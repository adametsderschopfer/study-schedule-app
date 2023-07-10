import { RootState } from "@store/rootReducer";
import { LoginStore } from "@domain/entity/auth/index";

export const selectAuthLogin = (state: RootState): LoginStore =>
  state.auth.login;
