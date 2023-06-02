import React, { createContext, useMemo } from "react";
import io from "socket.io-client";
import { useAuthContext } from "../hooks/useAuthContext";

const userLocalstorage = localStorage.getItem("user");

export const socket = io.connect(
  `${process.env.REACT_APP_HTTPS_PROXY}${
    userLocalstorage ? `?token=${JSON.parse(userLocalstorage).token}` : ""
  }`
);

export const SocketContext = createContext({ socket });

export const SocketContextProvider = ({ children }) => {
  const { user } = useAuthContext();

  const memoizedSocket = useMemo(() => {
    const userLocalstorage = localStorage.getItem("user");

    return io.connect(
      `${process.env.REACT_APP_HTTPS_PROXY}${
        userLocalstorage ? `?token=${JSON.parse(userLocalstorage).token}` : ""
      }`
    );
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket: memoizedSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
