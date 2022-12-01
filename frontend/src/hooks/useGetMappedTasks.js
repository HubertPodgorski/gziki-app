import { useContext, useEffect, useState } from "react";
import { mapTasks, mapTasksForAdminPanel } from "../helpers/tasks";
import { AppContext } from "../contexts/AppContext";

export const useGetMappedTasks = (adminPanel) => {
  const { tasks } = useContext(AppContext);

  const [mappedTasks, setMappedTasks] = useState([]);

  useEffect(() => {
    setMappedTasks(adminPanel ? mapTasksForAdminPanel(tasks) : mapTasks(tasks));
  }, [tasks, adminPanel]);

  return { mappedTasks, setMappedTasks };
};
