import { createContext, useState } from "react";

export const TaskContext = createContext({
  initialFormData: undefined,
});

// TODO: start using reducers and actions
export const TaskContextProvider = ({ children }) => {
  const [initialFormData, setInitialFormData] = useState();

  return (
    <TaskContext.Provider value={{ initialFormData, setInitialFormData }}>
      {children}
    </TaskContext.Provider>
  );
};
