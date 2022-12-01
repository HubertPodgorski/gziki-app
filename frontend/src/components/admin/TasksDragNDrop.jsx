import React from "react";
import TasksMainGrid from "../tasksGrid/TasksMainGrid";
import TasksRow from "../tasksGrid/TasksRow";
import TasksColumn from "../tasksGrid/TasksColumn";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import TaskCell from "../tasksGrid/TaskCell";
import ChipsGrid from "../ChipsGrid";
import DeleteIcon from "@mui/icons-material/Delete";
import { DragDropContext } from "react-beautiful-dnd";
import { socket } from "../SocketHandler";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useMoveTasksRow } from "../../hooks/useMoveTasksRow";
import { useMoveTasksCell } from "../../hooks/useMoveTasksCell";

const TasksDragNDrop = ({
  handleTaskEditClick,
  mappedTasks,
  setMappedTasks,
}) => {
  const moveTasksRow = useMoveTasksRow();
  const moveTasksCell = useMoveTasksCell();

  const isMobile = useIsMobile();

  const onDelete = (taskId) => {
    socket.emit("delete_task", { _id: taskId });
  };

  const onDragEnd = async (result) => {
    if (result.type === "row") {
      moveTasksRow(result, mappedTasks, setMappedTasks);
      return;
    }

    moveTasksCell(result, mappedTasks);
  };

  const onEditClick = async ({ position, description, dogs, _id }) => {
    await handleTaskEditClick(
      {
        position,
        description,
        dogs,
      },
      _id
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TasksMainGrid adminPanel>
        {Object.entries(mappedTasks).map(([rowIndex, columns], index) => (
          <TasksRow
            key={`${rowIndex}_${index}`}
            rowIndex={rowIndex}
            adminPanel
            index={index}
          >
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
                      <Typography variant={isMobile ? "body2" : "h5"}>
                        {item.description}
                      </Typography>

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
  );
};

export default TasksDragNDrop;
