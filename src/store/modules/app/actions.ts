import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateUserAuthDataFromLocalStorageAction,
  updateUserDataAction,
} from "@store/modules/user/actions";
import { selectUser } from "@store/modules/user/selector";
import { RootState } from "@store/rootReducer";

export const onAppStartAction = createAsyncThunk<
  unknown,
  void,
  {
    state: RootState;
  }
>("app/OnAppStart", async (_, { dispatch, getState }) => {
  await dispatch(updateUserAuthDataFromLocalStorageAction());
  const user = selectUser(getState());

  if (user.data.token) {
    await dispatch(updateUserDataAction());
    await dispatch(updateUserAuthDataFromLocalStorageAction());
  }
});
