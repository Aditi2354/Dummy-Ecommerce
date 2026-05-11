import {
  createContext,
  useContext,
  useEffect,
  useState,
 type ReactNode
} from "react";

import type { UserType } from "../types/authTypes";

import {
  getSession,
  logoutUser,
  saveSession
} from "../utils/auth";


interface AuthContextType {

  user: UserType | null;

  login: (userData: UserType) => void;

  logout: () => void;
}


const AuthContext =
  createContext<AuthContextType | null>(null);


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({
  children
}: AuthProviderProps) => {

 
  const [user, setUser] =
    useState<UserType | null>(null);

  
  useEffect(() => {

    const sessionUser = getSession();

    if (sessionUser) {
      setUser(sessionUser);
    }

  }, []);

 
  const login = (userData: UserType) => {

    setUser(userData);

    saveSession(userData);
  };


  const logout = () => {

    setUser(null);

    logoutUser();
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};