import { useContext, useMemo } from "react";
import { mapTasks, mapTasksForAdminPanel } from "../helpers/tasks";
import { AppContext } from "../contexts/AppContext";

export const useGetMappedTasks = (adminPanel) => {
  const { tasks } = useContext(AppContext);

  return useMemo(
    () => (adminPanel ? mapTasksForAdminPanel(tasks) : mapTasks(tasks)),
    [tasks]
  );
};
