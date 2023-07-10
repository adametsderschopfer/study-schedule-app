import { createAsyncThunk } from "@reduxjs/toolkit";
import { LStorage } from "@utils/LStorage";
import { appSlice, userSlice } from "@store/modules/index";
import { updateUserDataAction } from "@store/modules/user/actions";
import { USER_LS_KEY } from "@domain/app";
import { AuthApi } from "@domain/entity/auth/api";
import { LoginDTO } from "@domain/entity/auth/dto/login-dto";

export const submitLoginAction = createAsyncThunk<undefined, LoginDTO>(
  "login/submitLoginAction",
  async (fields, thunkAPI) => {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

    try {
      const data = await AuthApi.login(fields);

      if (data.id && data.token) {
        LStorage.setItem(USER_LS_KEY, data);

        thunkAPI.dispatch(userSlice.actions.setUserData(data));
        await thunkAPI.dispatch(updateUserDataAction());
      } else {
        return Promise.reject();
      }

      return;
    } catch (error) {
      console.error(error);
      return Promise.reject();
    } finally {
      thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
    }
  },
);
