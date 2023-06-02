import { useContext } from "react";
import { SocketContext } from "../contexts/SocketContext";
import { Socket } from "socket.io-client";

export const useSocketContext = () => {
  const context = useContext<{ socket: Socket<any, any> }>(SocketContext);

  return context;
};
