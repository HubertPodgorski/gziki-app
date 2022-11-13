import React, { useContext, useEffect, useMemo, useState } from "react";
import { Box, Button, DialogActions, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../components/inputs/FormTextField";
import FormModal from "../../components/FormModal";
import FormGrid from "../../components/FormGrid";
import axios from "axios";
import FormButtonsGrid from "../../components/FormButtonsGrid";
import FormSelect from "../../components/inputs/FormSelect";

export const getInitialTaskFormData = (maxRowIndex) => ({
  description: "",
  dogs: [],
  position: { columnIndex: 0, positionIndex: 0, rowIndex: maxRowIndex },
});

const TaskForm = ({ open, onClose, initialData, editingId }) => {
  // TODO: later maybe fetch dogs for event?
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      const { data } = await axios.get("/api/dogs");

      setDogs(data);
    };

    fetchDogs();
  }, []);

  const formMethods = useForm({
    defaultValues: initialData,
  });

  const { handleSubmit, reset } = useMemo(() => formMethods, [formMethods]);

  useEffect(() => {
    const { description, dogs, position } = initialData;

    reset({ description, dogs: dogs.map(({ _id }) => _id), position });
  }, [initialData]);

  const onSubmit = async (values) => {
    console.log("values => ", values);
    // TODO: map selected dogs to dogs
    // TODO: extract me to external method - used twice already
    const selectedDogs = values.dogs
      .map((dogId) => {
        const dog = dogs.find(({ _id }) => _id === dogId);

        if (!dog) return;

        return dog;
      })
      .filter((dog) => !!dog);

    const data = {
      description: values.description,
      dogs: selectedDogs,
      position: values.position,
    };

    const response = editingId
      ? await axios.patch(`/api/tasks/${editingId}`, data)
      : await axios.post("/api/tasks", data);

    if (response.status === 200) {
      onClose();
      return;
    }

    // TODO: error handling eventually?
  };

  return (
    <FormProvider {...formMethods}>
      <FormModal onClose={onClose} open={open} title="Task">
        <FormGrid>
          <FormTextField name="description" label="Description" required />

          <FormSelect
            name="dogs"
            label="Dogs"
            options={dogs.map(({ name, _id }) => ({ value: _id, label: name }))}
          />

          <DialogActions sx={{ padding: 0 }}>
            <Button size="medium" variant="outlined" onClick={onClose}>
              Cancel
            </Button>

            <Button
              size="medium"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </DialogActions>
        </FormGrid>
      </FormModal>
    </FormProvider>
  );
};

export default TaskForm;
