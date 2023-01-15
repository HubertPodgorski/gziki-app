import React, { createContext, useEffect, useState } from "react";
import { User } from "../helpers/types";
import { AuthContextType } from "./types";

export const AuthContext = createContext<Partial<AuthContextType>>({
  user: null,
});

// TODO: start using reducers and actions
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const clearUserData = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const logout = () => {
    clearUserData();
  };

  const login = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const userLocalstorage = localStorage.getItem("user");

    if (userLocalstorage) {
      const { user, token } = JSON.parse(userLocalstorage);

      if (!token) {
        clearUserData();
      }

      const parsedToken = JSON.parse(atob(token.split(".")[1]));

      if (parsedToken.exp * 1000 < new Date().getTime()) {
        clearUserData();
      } else {
        setUser(user);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
