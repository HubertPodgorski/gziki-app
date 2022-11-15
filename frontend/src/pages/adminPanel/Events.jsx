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
import dayjs from "dayjs";
import { useFormHelpers } from "../../hooks/useFormHelpers";
import { AppContext } from "../../contexts/AppContext";
import { socket } from "../../components/SocketHandler";

const Events = () => {
  const { events } = useContext(AppContext);

  const {
    formInitialData,
    editingId,
    formOpen,
    setFormOpen,
    handleEditClick,
    handleFormClose,
  } = useFormHelpers({
    name: "",
    date: new Date().toString(),
    dogs: [],
  });

  const onDeleteClick = async (id) => {
    socket.emit("delete_event", { _id: id });
  };

  const onFormClose = () => {
    handleFormClose();

    // TODO: maybe if success reload data?
  };

  const onEditClick = async ({ name, date }, id) => {
    await handleEditClick(
      {
        name,
        date,
      },
      id
    );
  };

  return (
    <>
      <CenteredContent>
        <List>
          {events.map(({ name, _id, date }) => (
            <ListItem
              divider
              key={_id}
              onClick={() => onEditClick({ name, date }, _id)}
            >
              {/*TODO: do edit*/}
              <ListItemButton>
                {name}: {dayjs(date).format("DD/MM/YYYY HH:mm")}
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

        <Button variant="contained" onClick={() => setFormOpen(true)}>
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
