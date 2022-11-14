import { createContext, useState } from "react";

export const AppContext = createContext({
  initialFormData: undefined,
  tasks: [],
});

// TODO: start using reducers and actions
export const AppContextProvider = ({ children }) => {
  const [initialFormData, setInitialFormData] = useState();
  const [tasks, setTasks] = useState([]);

  return (
    <AppContext.Provider
      value={{ initialFormData, setInitialFormData, tasks, setTasks }}
    >
      {children}
    </AppContext.Provider>
  );
};
