import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "@ui/layouts/DefaultLayout";
import { useAppSelector } from "@store/hooks";
import { selectUser } from "@store/modules/user/selector";
import { Roles } from "@domain/roles";
import { LoginPage } from "@app/pages/auth/login/LoginPage";
import { Logout } from "@app/pages/auth/logout/Logout";
import { NotFound } from "@app/pages/error-page/NotFound";
import { ProtectedRoute } from "@app/router/ProtectedRoute";
import { ClientRoutes } from "@app/router/route-components/ClientRoutes";

export const NavigationContainer: React.FC = () => {
  const user = useAppSelector(selectUser);

  if (!user.isAuthorized) {
    return (
      <Routes>
        <Route path={"login"} element={<LoginPage />} />
        <Route path={"*"} element={<Navigate to={"/login"} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path={"/"} element={<DefaultLayout />}>
        <Route
          path={"client/*"}
          element={
            <ProtectedRoute
              element={ClientRoutes}
              roleAccess={[Roles.Client]}
            />
          }
        />
      </Route>

      <Route path={"login"} element={<Navigate to={"/"} />} />
      <Route path={"logout"} element={<Logout />} />

      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
};
