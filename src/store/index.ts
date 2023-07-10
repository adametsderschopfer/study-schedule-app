import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line @typescript-eslint/naming-convention
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
