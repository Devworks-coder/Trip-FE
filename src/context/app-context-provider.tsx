import React, { useCallback, useContext, useEffect, useState } from "react";
import { APISERVICE } from "../service/app-service";
import AuthContext from "./app-context";
import { jwtDecode } from "jwt-decode";

export type LoginActionProps = {
  email: string;
  password: string;
};

type UserData = {
  username: string | null;
  email: string | null;
  exp: number | null;
  iat: number | null;
};

export type AuthData = {
  user: UserData;
};

type AuthContextType = {
  authData: AuthData;
  loginAction: (data: LoginActionProps) => Promise<void>;
  logoutAction: () => void;
  isFuelAdded: boolean;
  isMaintainenceAdded: boolean;
  isTripAdded: boolean;
  setIsFuelAdded: (value: boolean) => void;
  setIsMaintainenceAdded: (value: boolean) => void;
  setIsTripAdded: (value: boolean) => void;
};

export const AuthContextWrapper = (props: { children: React.ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData>(() => {
    const token = localStorage.getItem("appToken");
    if (token) {
      try {
        const decodedToken: UserData = jwtDecode(token);
        return { user: decodedToken };
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    return {
      user: {
        username: null,
        email: null,
        exp: null,
        iat: null,
      },
    };
  });

  const [isTripAdded, setIsTripAdded] = useState(false);
  const [isFuelAdded, setIsFuelAdded] = useState(false);
  const [isMaintainenceAdded, setIsMaintainenceAdded] = useState(false);

  const loginAction = async (data: LoginActionProps) => {
    const response = await APISERVICE({
      method: "POST",
      path: "signin",
      body: data,
    });
    const token = response?.data?.token;
    localStorage.setItem("appToken", token);
    const decodedToken: UserData = jwtDecode(token || "");
    setAuthData({ user: decodedToken });
  };

  const isTokenExpired = useCallback(() => {
    const token = localStorage.getItem("appToken");
    if (!token) return true;

    const decodedToken: UserData = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp ? decodedToken.exp < currentTime : true;
  }, []);

  const logoutAction = () => {
    setAuthData({
      user: {
        username: null,
        email: null,
        exp: null,
        iat: null,
      },
    });
    localStorage.removeItem("appToken");
  };

  useEffect(() => {
    if (isTokenExpired()) {
      logoutAction();
    }
  }, [isTokenExpired]);

  return (
    <AuthContext.Provider
      value={{
        authData,
        loginAction,
        logoutAction,
        isFuelAdded,
        isMaintainenceAdded,
        isTripAdded,
        setIsFuelAdded,
        setIsMaintainenceAdded,
        setIsTripAdded,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextWrapper;

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext) as AuthContextType;
};
