import { createContext } from "react";

export type AuthStateType = {
  userId: string;
  email: string;
  token: string;
  role: string;
  isLoggedIn: boolean;
};

export const initialAuthState = {
  userId: "",
  email: "",
  token: "",
  role: "",
  isLoggedIn: false,
};

export const AuthContext = createContext<{
  state: AuthStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialAuthState,
  dispatch: () => null,
});
