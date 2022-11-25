import React, { useContext } from "react";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import CenteredContent from "../../components/CenteredContent";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormHelpers } from "../../hooks/useFormHelpers";
import { AppContext } from "../../contexts/AppContext";
import { socket } from "../../components/SocketHandler";
import { useConfirmModal } from "../../hooks/useConfirmModal";
import DogTaskForm from "../forms/DogTaskForm";

const DogTasks = () => {
  const { dogTasks } = useContext(AppContext);
  const confirm = useConfirmModal();

  const {
    formInitialData,
    editingId,
    formOpen,
    setFormOpen,
    handleEditClick,
    handleFormClose,
  } = useFormHelpers({
    name: "",
  });

  const onDeleteClick = async (id) => {
    await confirm();

    socket.emit("delete_dog_task", { _id: id });
  };

  const onFormClose = () => {
    handleFormClose();
  };

  const onEditClick = async ({ name }, id) => {
    await handleEditClick(
      {
        name,
      },
      id
    );
  };

  return (
    <>
      <CenteredContent>
        <List>
          {dogTasks.map(({ name, _id }) => (
            <ListItem
              divider
              key={_id}
              onClick={() => onEditClick({ name }, _id)}
            >
              <ListItemButton>{name}</ListItemButton>

              <IconButton
                color="error"
                onClick={(e) => {
                  e.stopPropagation();

                  onDeleteClick(_id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          color="success"
          onClick={() => setFormOpen(true)}
        >
          Add
        </Button>
      </CenteredContent>

      <DogTaskForm
        onClose={onFormClose}
        open={formOpen}
        initialData={formInitialData}
        editingId={editingId}
      />
    </>
  );
};

export default DogTasks;
