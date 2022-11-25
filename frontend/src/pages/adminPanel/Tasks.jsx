import React from "react";
import { useGetMappedTasks } from "../../hooks/useGetMappedTasks";
import { Box, Button, useTheme } from "@mui/material";
import TaskForm from "../forms/TaskForm";
import { useGetMaxRowIndex } from "../../hooks/useGetMaxRowIndex";
import { useFormHelpers } from "../../hooks/useFormHelpers";
import ButtonsGrid from "../../components/ButtonsGrid";
import SaveEventAsTemplateButton from "../../components/admin/SaveEventAsTemplateButton";
import TasksDragNDrop from "../../components/admin/TasksDragNDrop";
import CurrentEventSelectWithDogs from "../../components/admin/CurrentEventSelectWithDogs";

const Tasks = () => {
  const theme = useTheme();
  // TODO: load tasks from template

  const mappedTasks = useGetMappedTasks(true);
  const maxRowIndex = useGetMaxRowIndex(mappedTasks);

  const {
    editingId: taskEditingId,
    formOpen: taskFormOpen,
    setFormOpen: setTaskFormOpen,
    handleEditClick: handleTaskEditClick,
    handleFormClose: handleTaskFormClose,
    formInitialData: taskFormInitialData,
  } = useFormHelpers({
    description: "",
    dogs: [],
    position: { columnIndex: 0, positionIndex: 0, rowIndex: maxRowIndex },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gridGap: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
          gridGap: theme.spacing(1),
        },
      }}
    >
      <CurrentEventSelectWithDogs />

      <TasksDragNDrop
        handleTaskEditClick={handleTaskEditClick}
        mappedTasks={mappedTasks}
      />

      <ButtonsGrid>
        <Button
          variant="contained"
          color="success"
          onClick={() => setTaskFormOpen(true)}
        >
          Add
        </Button>

        <SaveEventAsTemplateButton />
      </ButtonsGrid>

      <TaskForm
        open={taskFormOpen}
        onClose={handleTaskFormClose}
        maxRowIndex={maxRowIndex}
        initialData={taskFormInitialData}
        editingId={taskEditingId}
      />
    </Box>
  );
};

export default Tasks;
