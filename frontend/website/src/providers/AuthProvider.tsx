import { FC, PropsWithChildren, useReducer } from "react";
import { AuthContext, initialAuthState } from "../context/authContext";
import { authReducer } from "../context/authReducer";
interface AuthProviderProps {
  children?: React.ReactNode;
}
export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  children,
}: any) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
