import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  isAllowed: boolean;
  redirectPath: string;
  children: React.ReactNode;
};

function ProtectedRoute({
  isAllowed,
  redirectPath,
  children,
}: ProtectedRouteProps) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
