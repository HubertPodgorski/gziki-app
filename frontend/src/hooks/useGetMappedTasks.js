import { useEffect, useMemo, useState } from "react";
import { mapTasks, mapTasksForAdminPanel } from "../helpers/tasks";

export const useGetMappedTasks = (adminPanel) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks");

      const json = await response.json();

      if (response.ok) {
        setTasks(json);
      }
    };

    fetchTasks();
  }, []);

  return useMemo(
    () => (adminPanel ? mapTasksForAdminPanel(tasks) : mapTasks(tasks)),
    [tasks]
  );
};
