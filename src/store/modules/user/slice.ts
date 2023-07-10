import { createSlice } from "@reduxjs/toolkit";
import { LStorage } from "@utils/LStorage";
import {
  logoutAction,
  TUpdateUserAuthDataFromLocalStorageResult,
  updateUserAuthDataFromLocalStorageAction,
  updateUserDataAction,
} from "@store/modules/user/actions";
import { USER_LS_KEY } from "@domain/app";
import { IUser, IUserStore } from "@domain/entity/user";

const initialState: IUserStore = {
  isAuthorized: false,

  data: {} as IUser,

  loading: "loading",
  error: null,
  pagination: {},
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUserData(state, { payload }) {
      if (payload && payload.token) {
        state.isAuthorized = true;
        state.data.token = payload.token;
        state.data.id = payload.id;

        LStorage.setItem(
          USER_LS_KEY,
          (prevUserData: TUpdateUserAuthDataFromLocalStorageResult) => {
            if (prevUserData) {
              return {
                ...prevUserData,
                ...payload,
              };
            }

            return payload;
          },
        );
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(logoutAction, (state) => {
      LStorage.setItem(USER_LS_KEY, {});

      state.isAuthorized = false;
      state.data = {} as IUser;
    });

    builder
      .addCase(updateUserAuthDataFromLocalStorageAction.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateUserAuthDataFromLocalStorageAction.fulfilled, (state) => {
        state.loading = "idle";
      });

    builder
      .addCase(updateUserDataAction.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateUserDataAction.fulfilled, (state, { payload }) => {
        state.data = payload;
        LStorage.setItem(USER_LS_KEY, payload);
        state.loading = "idle";
      })
      .addCase(updateUserDataAction.rejected, (state) => {
        state.isAuthorized = false;
        state.loading = "idle";
      });
  },
});
