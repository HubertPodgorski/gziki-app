import React, { useContext, useEffect } from "react";
import io from "socket.io-client";
import { AppContext } from "../contexts/AppContext";

const socket = io.connect("http://localhost:3001");

const SocketHandler = () => {
  const { setTasks, tasks } = useContext(AppContext);

  useEffect(() => {
    socket.on("tasks_updated", (received) => {
      console.log("received => ", received);
      setTasks(received.data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return null;
};

export default SocketHandler;
