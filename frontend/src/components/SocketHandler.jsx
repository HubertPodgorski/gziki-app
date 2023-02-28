import React, { useContext, useEffect } from "react";
import io from "socket.io-client";
import { AppContext } from "../contexts/AppContext";
import { AuthContext } from "../contexts/AuthContext";

const userLocalstorage = localStorage.getItem("user");

// set the handshake with user token for team auth
export const socket = io.connect(
  `${process.env.REACT_APP_HTTPS_PROXY}${
    userLocalstorage ? `?token=${JSON.parse(userLocalstorage).token}` : ""
  }`
);

const SocketHandler = () => {
  const {
    setTasks,
    setDogs,
    setEvents,
    setUsers,
    setDogTasks,
    setEventTemplates,
  } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    socket.on("tasks_updated", (received) => {
      setTasks(received);
    });

    socket.on("users_updated", (received) => {
      setUsers(received);
    });

    socket.on("dogs_updated", (received) => {
      setDogs(received);
    });

    socket.on("events_updated", (received) => {
      setEvents(received);
    });

    socket.on("dog_tasks_updated", (received) => {
      setDogTasks(received);
    });

    socket.on("event_templates_updated", (received) => {
      setEventTemplates(received);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    console.log("user => ", user);
    const userLocalstorage = localStorage.getItem("user");

    if (!userLocalstorage || !JSON.parse(userLocalstorage).token) return;
    console.log("did fetch");

    socket.emit("get_all_dogs", (dogs) => {
      setDogs(dogs);
    });

    socket.emit("get_all_events", (events) => {
      setEvents(events);
    });

    socket.emit("get_all_tasks", (tasks) => {
      setTasks(tasks);
    });

    socket.emit("get_all_users", (users) => {
      setUsers(users);
    });

    socket.emit("get_all_dog_tasks", (dogTasks) => {
      setDogTasks(dogTasks);
    });

    socket.emit("get_all_event_templates", (eventTemplates) => {
      setEventTemplates(eventTemplates);
    });
  }, [user]);

  return null;
};

export default SocketHandler;
