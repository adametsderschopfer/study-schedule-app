import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "@store/hooks";
import { logoutAction } from "@store/modules/user/actions";

export const Logout: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return <Navigate to={"/login/"} replace={true} />;
};
