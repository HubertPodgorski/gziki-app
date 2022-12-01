import React from "react";
import TasksMainGrid from "../../components/tasksGrid/TasksMainGrid";
import TasksRow from "../../components/tasksGrid/TasksRow";
import TasksColumn from "../../components/tasksGrid/TasksColumn";
import { useGetMappedTasks } from "../../hooks/useGetMappedTasks";
import UserTaskCell from "../../components/UserTaskCell";

const Tasks = () => {
  const { mappedTasks } = useGetMappedTasks();

  return (
    <TasksMainGrid>
      {Object.entries(mappedTasks).map(([rowIndex, columns]) => (
        <TasksRow key={rowIndex} rowIndex={rowIndex} userPanel>
          {Object.entries(columns).map(([columnIndex, items]) => (
            <TasksColumn columnIndex={columnIndex} key={columnIndex}>
              {items.map((item, index) => (
                <UserTaskCell item={item} key={item._id} index={index} />
              ))}
            </TasksColumn>
          ))}
        </TasksRow>
      ))}
    </TasksMainGrid>
  );
};

export default Tasks;
