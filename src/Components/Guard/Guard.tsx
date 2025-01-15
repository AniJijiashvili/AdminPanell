import { ReactNode } from "react";
import { Navigate, useNavigate } from "react-router-dom";

let authenticated = false;

export function useAuth() {
  const navigate = useNavigate();

  const authorize = () => {
    authenticated = true;
    navigate("/users");
  };

  const logout = () => {
    authenticated = false;
    navigate("/");
  };

  return {
    authenticated,
    authorize,
    logout,
  };
}

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { authenticated } = useAuth();

  return authenticated ? <>{children}</> : <Navigate to="/" />;
};
