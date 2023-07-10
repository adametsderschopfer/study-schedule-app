import { RootState } from "@store/rootReducer";
import { IAppStore } from "@domain/entity/app";

export const selectApp = (state: RootState): IAppStore => state.app;
