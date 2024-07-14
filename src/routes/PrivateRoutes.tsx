import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
export default function PrivateRoutes({ children }: { children: ReactNode }) {
  const user = localStorage.getItem("auth-token");
  return user ? <>{children}</> : <Navigate to="/login" />;
}
