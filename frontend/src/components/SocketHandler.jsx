import React, { useContext, useEffect } from "react";
import io from "socket.io-client";
import { AppContext } from "../contexts/AppContext";

export const socket = io.connect(process.env.REACT_APP_HTTPS_PROXY);

const SocketHandler = () => {
  const {
    setTasks,
    setDogs,
    setEvents,
    setUsers,
    setDogTasks,
    setEventTemplates,
  } = useContext(AppContext);

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
  }, []);

  return null;
};

export default SocketHandler;
