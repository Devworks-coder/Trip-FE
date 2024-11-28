import React, { useCallback, useContext, useEffect, useState } from "react";
import { APISERVICE } from "../service/app-service";
import AuthContext from "./app-context";
import { jwtDecode } from "jwt-decode";

type LoginActionProps = {
  email: string;
  password: string;
};
type UserData = {
  username: string | null;
  email: string | null;
  exp: number | null;
  iat: number | null;
};

type AuthData = {
  user: UserData;
};

type AuthContextType = {
  authData: AuthData;
  loginAction: (data: LoginActionProps) => Promise<void>; // Correct the type of loginAction
  logoutAction: () => void;
  isFuelAdded: boolean;
  isMaintainenceAdded: boolean;
  isTripAdded: boolean;
  setIsFuelAdded: (value: boolean) => void;
  setIsMaintainenceAdded: (value: boolean) => void;
  setIsTripAdded: (value: boolean) => void;
};
export const AuthContextWrapper = (props: { children: React.ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData>({
    user: {
      username: null,
      email: null,
      exp: null,
      iat: null,
    },
  });
  const [isTripAdded, setIsTripAdded] = useState(false);
  const [isFuelAdded, setIsFuelAdded] = useState(false);
  const [isMaintainenceAdded, setIsMaintainenceAdded] = useState(false);

  //   const navigate = useNavigate();

  const decodeTokenvalues = (): UserData | undefined => {
    const token = localStorage.getItem("appToken");
    if (!token) return undefined;
    const decodeToken: UserData = jwtDecode(token || "");
    return decodeToken;
  };

  const loginAction = async (data: LoginActionProps) => {
    const respose = await APISERVICE({
      method: "POST",
      path: "signin",
      body: data,
    });
    const token = respose?.data?.token;
    localStorage.setItem("appToken", token);
    const decodeToken: UserData = jwtDecode(token || "");
    setAuthData((prev) => ({ ...prev, user: decodeToken }));
  };
  const isTokenExpired = useCallback(() => {
    const currentTime = Date.now() / 1000;
    const expDate = decodeTokenvalues()?.exp;
    if (!expDate) return true;
    const isTimeExceeded: boolean = expDate ? expDate < currentTime : false;
    return isTimeExceeded;
  }, []);

  function logoutAction() {
    setAuthData((prev) => ({
      ...prev,
      user: {
        username: null,
        email: null,
        exp: null,
        iat: null,
      },
    }));
    localStorage.removeItem("appToken");
  }
  useEffect(() => {
    const value = isTokenExpired();
    if (!value) {
      setAuthData((prev) => ({
        ...prev,
        user: decodeTokenvalues() || {
          username: null,
          email: null,
          exp: null,
          iat: null,
        },
      }));
    } else {
      logoutAction();
    }
  }, [isTokenExpired]);
  return (
    <AuthContext.Provider
      value={{
        authData,
        loginAction,
        isTokenExpired,
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
