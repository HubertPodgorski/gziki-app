import { createContext, useState } from "react";

export const AppContext = createContext({
  tasks: [],
  dogs: [],
  events: [],
  users: [],
  dogTasks: [],
});

// TODO: start using reducers and actions
export const AppContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [dogTasks, setDogTasks] = useState([]);

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        dogs,
        setDogs,
        events,
        setEvents,
        users,
        setUsers,
        dogTasks,
        setDogTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
