import { createSlice } from "@reduxjs/toolkit";
import { submitLoginAction } from "@store/modules/auth/sections/login/actions";
import { LoginStore } from "@domain/entity/auth/index";

export const initialState: LoginStore = {
  loading: "idle",
};

export const loginSlice = createSlice({
  name: "auth/login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(submitLoginAction.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(submitLoginAction.fulfilled, (state) => {
        state.loading = "idle";
      })
      .addCase(submitLoginAction.rejected, (state) => {
        state.loading = "error";
      });
  },
});
