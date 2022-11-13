import React, { useEffect, useState } from "react";
import DogForm from "../forms/DogForm";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import CenteredContent from "../../components/CenteredContent";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonForm from "../forms/PersonForm";
import PetsIcon from "@mui/icons-material/Pets";
import { useFormHelpers } from "../../hooks/useFormHelpers";

const People = () => {
  const [people, setPeople] = useState([]);

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

  useEffect(() => {
    const fetchPeople = async () => {
      const { data } = await axios.get("/api/people");

      setPeople(data);
    };

    fetchPeople();
  }, []);

  const onDeleteClick = async (id) => {
    await axios.delete(`/api/people/${id}`);

    // TODO: reload data?? Probably WS will deal with this
  };

  const onFormClose = () => {
    handleFormClose();

    // TODO: maybe if success reload data?
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
          {people.map(({ name, _id, dogs }) => (
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

        <Button variant="contained" onClick={() => setFormOpen(true)}>
          Add
        </Button>
      </CenteredContent>

      <PersonForm
        onClose={onFormClose}
        open={formOpen}
        initialData={formInitialData}
        editingId={editingId}
      />
    </>
  );
};

export default People;
