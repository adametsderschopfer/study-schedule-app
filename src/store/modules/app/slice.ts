import { createSlice } from "@reduxjs/toolkit";
import { onAppStartAction } from "@store/modules/app/actions";
import { IAppStore } from "@domain/entity/app";

const initialState: IAppStore = {
  pageLoading: "loading",
  isActionLoading: false,
};

export const appSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setActionLoaderStatus(state, { payload }) {
      state.isActionLoading = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(onAppStartAction.pending, (state) => {
        state.pageLoading = "loading";
      })
      .addCase(onAppStartAction.fulfilled, (state) => {
        state.pageLoading = "idle";
      });
  },
});
