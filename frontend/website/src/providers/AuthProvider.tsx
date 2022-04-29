import React from "react";
import { FC, PropsWithChildren, useReducer } from "react";
import { AuthContext, initialAuthState } from "../context/authContext";
import { authReducer } from "../context/authReducer";
interface AuthProviderProps {}
export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  children,
}: any) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  React.useEffect(() => {
    async function loadSavedAuthState() {
      const savedAppState = getSavedAppState();

      dispatch({ type: "SAVED_STATE", payload: savedAppState });
    }
    loadSavedAuthState();
  }, []);

  React.useEffect(() => {
    const updateLocalStorage = async () => {
      try {
        if (state.isLoggedIn) {
          const jsonValue = JSON.stringify(state);
          localStorage.setItem("user", jsonValue);
        }
      } catch (e) {
        console.log(e);
      }
    };
    updateLocalStorage();
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const getSavedAppState = () => {
  try {
    const jsonValue = localStorage.getItem("user");
    return jsonValue ? JSON.parse(jsonValue) : initialAuthState;
  } catch (e) {
    return initialAuthState;
  }
};
