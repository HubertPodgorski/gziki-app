import React, { useEffect, useState } from "react";
import DogForm from "../forms/DogForm";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import axios from "axios";
import CenteredContent from "../../components/CenteredContent";
import DeleteIcon from "@mui/icons-material/Delete";
import EventForm from "../forms/EventForm";
import dayjs from "dayjs";
import { useFormHelpers } from "../../hooks/useFormHelpers";

const Events = () => {
  const [events, setEvents] = useState([]);

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
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get("/api/events");

      setEvents(data);
    };

    fetchEvents();
  }, []);

  const onDeleteClick = async (id) => {
    await axios.delete(`/api/events/${id}`);

    // TODO: reload data
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
