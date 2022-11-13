import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../../contexts/taskFormContext";
import { sortTasksByPositionIndex } from "../../helpers/tasks";
import { useGetMappedTasks } from "../../hooks/useGetMappedTasks";
import {
  Box,
  Button,
  CardHeader,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import TasksRow from "../../components/tasksGrid/TasksRow";
import TasksColumn from "../../components/tasksGrid/TasksColumn";
import TaskCell from "../../components/tasksGrid/TaskCell";
import TasksMainGrid from "../../components/tasksGrid/TasksMainGrid";
import { DragDropContext } from "react-beautiful-dnd";
import TaskForm, { getInitialTaskFormData } from "../forms/TaskForm";
import { useGetMaxRowIndex } from "../../hooks/useGetMaxRowIndex";
import {
  getMappedItemsToUpdate,
  getNewAndOldPositionIndexes,
} from "../../helpers/dragNDrop";
import axios from "axios";
import PetsIcon from "@mui/icons-material/Pets";
import DogChipsGrid from "../../components/DogChipsGrid";
import { useFormHelpers } from "../../hooks/useFormHelpers";

const Tasks = () => {
  const mappedTasks = useGetMappedTasks(true);
  const maxRowIndex = useGetMaxRowIndex(mappedTasks);

  const {
    formInitialData,
    editingId,
    formOpen,
    setFormOpen,
    handleEditClick,
    handleFormClose,
  } = useFormHelpers(getInitialTaskFormData(maxRowIndex));

  console.log("mappedTasks => ", mappedTasks);

  const onDelete = async (taskId) => {
    const { status } = axios.delete(`/api/tasks/${taskId}`);

    if (status === 200) {
      // TODO: show snackbar that deleting was fine
      //   TODO: refetch list
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const mappedItemsToUpdate = getMappedItemsToUpdate(
      destination,
      source,
      mappedTasks,
      draggableId
    );

    await axios.patch(`/api/tasks/update-order`, {
      tasks: mappedItemsToUpdate,
    });
  };

  const onFormClose = () => {
    handleFormClose();

    // TODO: maybe if success reload data?
  };

  const onEditClick = async ({ position, description, dogs, _id }) => {
    await handleEditClick(
      {
        position,
        description,
        dogs,
      },
      _id
    );
  };

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <TasksMainGrid>
          {Object.entries(mappedTasks).map(([rowIndex, columns], index) => (
            <TasksRow key={`${rowIndex}_${index}`} rowIndex={rowIndex}>
              {Object.entries(columns).map(([columnIndex, items]) => (
                <TasksColumn
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  key={columnIndex}
                  adminPanel
                >
                  {!items.length && (
                    <Box
                      sx={{
                        padding: 1,
                        background: "#333",
                        borderRadius: "6px",
                      }}
                    >
                      Task placeholder
                    </Box>
                  )}

                  {!!items.length &&
                    items.map((item, index) => (
                      <TaskCell
                        index={index}
                        adminPanel
                        id={item._id}
                        key={item._id}
                        onClick={() => {
                          onEditClick(item);
                        }}
                      >
                        <Typography variant="h5">{item.description}</Typography>

                        {item.dogs.length > 0 && (
                          <DogChipsGrid>
                            {item.dogs.map(({ name, _id }) => (
                              <Chip label={name} key={_id} />
                            ))}
                          </DogChipsGrid>
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
      </DragDropContext>

      <Button variant="contained" onClick={() => setFormOpen(true)}>
        Add
      </Button>

      <TaskForm
        open={formOpen}
        onClose={onFormClose}
        maxRowIndex={maxRowIndex}
        initialData={formInitialData}
        editingId={editingId}
      />
    </Box>
  );
};

export default Tasks;
