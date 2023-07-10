import { RootState } from "@store/rootReducer";
import { IUserStore, Role } from "@domain/entity/user";

export const selectUser = (state: RootState): IUserStore => state.user;
export const selectUserRole = (state: RootState): Role => state.user.data.role;
