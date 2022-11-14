import { createContext, useState } from "react";

export const AppContext = createContext({
  tasks: [],
  dogs: [],
  events: [],
  people: [],
});

// TODO: start using reducers and actions
export const AppContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [people, setPeople] = useState([]);

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        dogs,
        setDogs,
        events,
        setEvents,
        people,
        setPeople,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
