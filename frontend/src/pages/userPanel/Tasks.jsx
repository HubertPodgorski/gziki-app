import React from "react";
import { Chip, Typography } from "@mui/material";
import TasksMainGrid from "../../components/tasksGrid/TasksMainGrid";
import TasksRow from "../../components/tasksGrid/TasksRow";
import TasksColumn from "../../components/tasksGrid/TasksColumn";
import TaskCell from "../../components/tasksGrid/TaskCell";
import { useGetMappedTasks } from "../../hooks/useGetMappedTasks";
import ChipsGrid from "../../components/ChipsGrid";

const Tasks = () => {
  const mappedTasks = useGetMappedTasks();

  return (
    <TasksMainGrid>
      {Object.entries(mappedTasks).map(([rowIndex, columns]) => (
        <TasksRow key={rowIndex} rowIndex={rowIndex} userPanel>
          {Object.entries(columns).map(([columnIndex, items]) => (
            <TasksColumn columnIndex={columnIndex} key={columnIndex}>
              {items.map((item, index) => (
                <TaskCell index={index} id={item._id} key={item._id}>
                  <Typography variant="h5">{item.description}</Typography>

                  {item.dogs.length > 0 && (
                    <ChipsGrid>
                      {item.dogs.map(({ name, _id }) => (
                        <Chip label={name} key={_id} />
                      ))}
                    </ChipsGrid>
                  )}

                  {item.dogs.length === 0 && (
                    <Typography>No dogs selected</Typography>
                  )}
                </TaskCell>
              ))}
            </TasksColumn>
          ))}
        </TasksRow>
      ))}
    </TasksMainGrid>
  );
};

export default Tasks;
