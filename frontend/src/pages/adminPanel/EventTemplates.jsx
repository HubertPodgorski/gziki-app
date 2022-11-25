import React, { useContext } from "react";
import { IconButton, List, ListItem, ListItemButton } from "@mui/material";
import CenteredContent from "../../components/CenteredContent";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormHelpers } from "../../hooks/useFormHelpers";
import { AppContext } from "../../contexts/AppContext";
import { socket } from "../../components/SocketHandler";
import { useConfirmModal } from "../../hooks/useConfirmModal";
import EventTemplateForm from "../forms/EventTemplateForm";

const EventTemplates = () => {
  const { eventTemplates } = useContext(AppContext);
  const confirm = useConfirmModal();

  const {
    formInitialData,
    editingId,
    formOpen,
    handleEditClick,
    handleFormClose,
  } = useFormHelpers({
    name: "",
  });

  const onDeleteClick = async (id) => {
    await confirm();

    socket.emit("delete_event_template", { _id: id });
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
          {eventTemplates.map(({ name, _id }) => (
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
      </CenteredContent>

      <EventTemplateForm
        onClose={onFormClose}
        open={formOpen}
        initialData={formInitialData}
        editingId={editingId}
      />
    </>
  );
};

export default EventTemplates;
