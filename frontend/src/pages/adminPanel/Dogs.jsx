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
import { useFormHelpers } from "../../hooks/useFormHelpers";

const Dogs = () => {
  const [dogs, setDogs] = useState([]);

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
    const fetchDogs = async () => {
      const { data } = await axios.get("/api/dogs");

      setDogs(data);
    };

    fetchDogs();
  }, []);

  console.log("dogs => ", dogs);

  const onDeleteClick = async (id) => {
    await axios.delete(`/api/dogs/${id}`);

    // TODO: reload data
  };

  const onFormClose = () => {
    handleFormClose();

    // TODO: maybe if success reload data?
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
