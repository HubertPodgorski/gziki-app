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
import EventForm from "../forms/EventForm";
import { useFormHelpers } from "../../hooks/useFormHelpers";
import { AppContext } from "../../contexts/AppContext";
import { useConfirmModal } from "../../hooks/useConfirmModal";
import { EventType } from "../../components/inputs/consts";
import { getBackgroundColorBasedOnType } from "../../helpers/calendar";
import { useSocketContext } from "../../hooks/useSocketContext";
import { formatDate } from "../../helpers/dateHelpers";

const Events = () => {
  const { socket } = useSocketContext();
  const confirm = useConfirmModal();
  const { events } = useContext(AppContext);

  const {
    formInitialData,
    editingId,
    formOpen,
    setFormOpen,
    handleEditClick,
    handleFormClose,
  } = useFormHelpers({
    type: EventType.TRAINING,
    name: "",
    date: new Date().toString(),
    dogs: [],
  });

  const onDeleteClick = async (id) => {
    await confirm();

    socket.emit("delete_event", { _id: id });
  };

  const onFormClose = () => {
    handleFormClose();
  };

  const onEditClick = async ({ name, date, type }, id) => {
    await handleEditClick(
      {
        name,
        date,
        type: type ?? EventType.TRAINING,
      },
      id
    );
  };

  return (
    <>
      <CenteredContent>
        <List>
          {events.map(({ name, _id, date, type }) => (
            <ListItem
              sx={{ backgroundColor: getBackgroundColorBasedOnType(type) }}
              divider
              key={_id}
              onClick={() => onEditClick({ name, date, type }, _id)}
            >
              {/*TODO: do edit*/}
              <ListItemButton>
                {name}: {formatDate(date, "dd/MM/yyyy HH:mm")}
              </ListItemButton>

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

      <EventForm
        onClose={onFormClose}
        open={formOpen}
        initialData={formInitialData}
        editingId={editingId}
      />
    </>
  );
};

export default Events;
