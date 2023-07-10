import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@store/index";
import { RootState } from "@store/rootReducer";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
