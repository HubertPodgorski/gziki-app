import React, { useContext } from "react";
import DogForm from "../forms/DogForm";
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

const Dogs = () => {
  const { dogs } = useContext(AppContext);
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
    dogs: [],
  });

  const onDeleteClick = async (id) => {
    await confirm();

    socket.emit("delete_dog", { _id: id });
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
          {dogs.map(({ name, _id }) => (
            <ListItem
              divider
              key={_id}
              onClick={() => onEditClick({ name }, _id)}
            >
              {/*TODO: do edit*/}
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

        <Button variant="contained" onClick={() => setFormOpen(true)}>
          Add
        </Button>
      </CenteredContent>

      <DogForm
        onClose={onFormClose}
        open={formOpen}
        initialData={formInitialData}
        editingId={editingId}
      />
    </>
  );
};

export default Dogs;
