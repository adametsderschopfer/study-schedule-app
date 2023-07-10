import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LStorage } from "@utils/LStorage";
import { userSlice } from "@store/modules/index";
import { USER_LS_KEY } from "@domain/app";
import { UserApi } from "@domain/entity/user/api";

const USER_ID = "";
const USER_KEY = "";

export type TUpdateUserAuthDataFromLocalStorageResult = {
  token: string;
  id: string;
} | null;

export const updateUserAuthDataFromLocalStorageAction = createAsyncThunk(
  "User/updateUserAuthDataFromLocalStorageAction",
  async (_, thunkAPI) => {
    if (USER_ID && USER_KEY) {
      return {
        token: USER_KEY,
        id: USER_ID,
      };
    }

    thunkAPI.dispatch(
      userSlice.actions.setUserData(
        LStorage.getItem<TUpdateUserAuthDataFromLocalStorageResult>(
          USER_LS_KEY,
        ),
      ),
    );

    return;
  },
);

export const updateUserDataAction = createAsyncThunk(
  "User/updateUserDataAction",
  async () => {
    const response = await UserApi.getUser();
    return response.data;
  },
);

export const logoutAction = createAction("User/logoutAction");
