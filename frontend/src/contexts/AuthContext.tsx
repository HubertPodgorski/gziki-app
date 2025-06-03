import React, { createContext, useEffect, useState } from "react";
import { Dog, User } from "../helpers/types";
import { AuthContextType } from "./types";
import { Socket } from "socket.io-client";

export const AuthContext = createContext<Partial<AuthContextType>>({
  user: null,
  socket: null,
});

// TODO: start using reducers and actions
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);

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

  const setUserDogs = (dogs: Dog[]) => {
    setUser((prevUser) => ({ ...prevUser, dogs }));
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
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
        setSocket,
        socket,
        setUserDogs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
