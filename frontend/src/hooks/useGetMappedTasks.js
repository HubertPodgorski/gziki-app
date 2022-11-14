import { useEffect, useMemo, useState } from "react";
import { mapTasks, mapTasksForAdminPanel } from "../helpers/tasks";
import axios from "axios";

export const useGetMappedTasks = (adminPanel) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, status } = await axios.get("/api/tasks");

      if (status === 200) {
        setTasks(data);
      }
    };

    fetchTasks();
  }, []);

  return useMemo(
    () => (adminPanel ? mapTasksForAdminPanel(tasks) : mapTasks(tasks)),
    [tasks]
  );
};
