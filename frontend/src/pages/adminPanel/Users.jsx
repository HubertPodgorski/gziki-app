import React, { useContext } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CenteredContent from "../../components/CenteredContent";
import DeleteIcon from "@mui/icons-material/Delete";
import UserForm from "../forms/UserForm";
import PetsIcon from "@mui/icons-material/Pets";
import { useFormHelpers } from "../../hooks/useFormHelpers";
import { AppContext } from "../../contexts/AppContext";
import { socket } from "../../components/SocketHandler";
import { useConfirmModal } from "../../hooks/useConfirmModal";

const Users = () => {
  const confirm = useConfirmModal();
  const { users } = useContext(AppContext);

  const {
    formInitialData,
    editingId,
    formOpen,
    handleEditClick,
    handleFormClose,
  } = useFormHelpers({
    name: "",
    dogs: [],
  });

  const onDeleteClick = async (id) => {
    await confirm();

    socket.emit("delete_user", { _id: id });
  };

  const onFormClose = () => {
    handleFormClose();
  };

  const onEditClick = async ({ name, dogs }, id) => {
    await handleEditClick(
      {
        name,
        dogs,
      },
      id
    );
  };

  return (
    <>
      <CenteredContent>
        <List>
          {users.map(({ name, _id, dogs }) => (
            <ListItem
              divider
              key={_id}
              onClick={() => onEditClick({ name, dogs }, _id)}
            >
              <ListItemButton>{name}</ListItemButton>

              {dogs.length > 0 && (
                <>
                  <ListItemIcon>
                    <PetsIcon />
                  </ListItemIcon>
                  {dogs.map(({ name, _id }) => (
                    <ListItemText key={_id}>{name}</ListItemText>
                  ))}
                </>
              )}

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
      </CenteredContent>

      <UserForm
        onClose={onFormClose}
        open={formOpen}
        initialData={formInitialData}
        editingId={editingId}
      />
    </>
  );
};

export default Users;
