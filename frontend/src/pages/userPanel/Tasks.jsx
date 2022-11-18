import React, { useContext, useEffect, useMemo, useState } from "react";
import { Box, Chip, Typography } from "@mui/material";
import { AppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { mapTasks } from "../../helpers/tasks";
import TasksMainGrid from "../../components/tasksGrid/TasksMainGrid";
import TasksRow from "../../components/tasksGrid/TasksRow";
import TasksColumn from "../../components/tasksGrid/TasksColumn";
import TaskCell from "../../components/tasksGrid/TaskCell";
import { useGetMappedTasks } from "../../hooks/useGetMappedTasks";
import DogChipsGrid from "../../components/DogChipsGrid";
import DogChipsWrappable from "../../components/DogChipsWrappable";

// TODO: style me later
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
                    <DogChipsWrappable>
                      {item.dogs.map(({ name, _id }) => (
                        <Chip label={name} key={_id} />
                      ))}
                    </DogChipsWrappable>
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
