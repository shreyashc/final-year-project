import { PropsWithChildren, useState } from "react";
import { FC, useContext, useEffect } from "react";
import { apiClient } from "../api/client";
import { AuthContext } from "../context/authContext";
interface AxiosProviderProps {
  children?: JSX.Element;
}

let tokenInterceptor: any = null;

export const setClientToken = (token: string) => {
  tokenInterceptor = apiClient.interceptors.request.use(function (config) {
    if (config && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
};

const removeClientTokenInterceptor = () => {
  if (tokenInterceptor !== null) {
    apiClient.interceptors.request.eject(tokenInterceptor);
  }
  tokenInterceptor = null;
};

const AxiosProvider: FC<PropsWithChildren<AxiosProviderProps>> = ({
  children,
}: any) => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const [intseptSet, setIntseptSet] = useState(false);
  useEffect(() => {
    if (authState?.isLoggedIn && tokenInterceptor == null) {
      setClientToken(authState.token);
    }
    if (!authState?.isLoggedIn && tokenInterceptor !== null) {
      removeClientTokenInterceptor();
    }
  }, [authState, intseptSet]);

  return children;
};

export default AxiosProvider;
