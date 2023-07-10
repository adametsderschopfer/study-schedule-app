import React from "react";
import { LoadableComponent } from "react-loadable";
import { Navigate } from "react-router-dom";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { useAppSelector } from "@store/hooks";
import { selectUserRole } from "@store/modules/user/selector";
import { Roles } from "@domain/roles";

interface ProtectedRouteParams {
  element: React.FC | (React.ComponentType & LoadableComponent);
  roleAccess?: Roles[];
}

export const ProtectedRoute: React.FC<ProtectedRouteParams> = (params) => {
  const role = useAppSelector(selectUserRole);
  const Element = params.element;

  if (
    params.roleAccess &&
    params.roleAccess.length &&
    !params.roleAccess.includes(role as never)
  ) {
    return <Navigate to={"/"} />;
  }

  return (
    <ErrorBoundary>
      <Element />
    </ErrorBoundary>
  );
};
