import React, { useCallback, useContext, useMemo } from "react";
import { useGetMappedTasks } from "../../hooks/useGetMappedTasks";
import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import TasksRow from "../../components/tasksGrid/TasksRow";
import TasksColumn from "../../components/tasksGrid/TasksColumn";
import TaskCell from "../../components/tasksGrid/TaskCell";
import TasksMainGrid from "../../components/tasksGrid/TasksMainGrid";
import { DragDropContext } from "react-beautiful-dnd";
import TaskForm from "../forms/TaskForm";
import { useGetMaxRowIndex } from "../../hooks/useGetMaxRowIndex";
import { getMappedItemsToUpdate } from "../../helpers/dragNDrop";
import DogChipsGrid from "../../components/DogChipsGrid";
import { useFormHelpers } from "../../hooks/useFormHelpers";
import { socket } from "../../components/SocketHandler";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormProvider, useForm } from "react-hook-form";
import { AppContext } from "../../contexts/AppContext";
import FormSelect from "../../components/inputs/FormSelect";
import tasks from "../userPanel/Tasks";

const Tasks = () => {
  const { events, tasks } = useContext(AppContext);

  const formMethods = useForm({
    defaultValues: { event: [] },
  });

  const mappedTasks = useGetMappedTasks(true);
  const maxRowIndex = useGetMaxRowIndex(mappedTasks);

  const {
    editingId,
    formOpen,
    setFormOpen,
    handleEditClick,
    handleFormClose,
    formInitialData,
  } = useFormHelpers({
    description: "",
    dogs: [],
    position: { columnIndex: 0, positionIndex: 0, rowIndex: maxRowIndex },
  });

  const onDelete = (taskId) => {
    socket.emit("delete_task", { _id: taskId });
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

    socket.emit("update_tasks_order", { tasks: mappedItemsToUpdate });
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

  const selectedEvent = formMethods.watch("event");
  const selectedEventDogs = useMemo(() => {
    if (!selectedEvent) return [];

    const event = events.find(({ _id }) => _id === selectedEvent);

    if (!event) return [];

    return event.dogs;
  }, [selectedEvent]);

  const isDogPlanned = useCallback(
    (dogId) =>
      tasks.some(({ dogs }) =>
        dogs.some(({ _id: taskDogId }) => dogId === taskDogId)
      ),
    [selectedEventDogs, tasks]
  );

  return (
    <Box>
      <Box sx={{ padding: 2 }}>
        <FormProvider {...formMethods}>
          <FormSelect
            multi={false}
            name="event"
            label="Event"
            options={[
              { value: "", label: "Brak" },
              ...events.map(({ name: label, _id: value }) => ({
                value,
                label,
              })),
            ]}
          />
        </FormProvider>
      </Box>

      {selectedEventDogs.length > 0 && (
        <DogChipsGrid sx={{ padding: 2 }}>
          {selectedEventDogs.map(({ _id, name }) => (
            <Chip
              label={name}
              key={_id}
              color={isDogPlanned(_id) ? "success" : "error"}
            />
          ))}
        </DogChipsGrid>
      )}

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

                        <IconButton
                          sx={{ position: "absolute", top: 2, right: 2 }}
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();

                            onDelete(item._id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
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
