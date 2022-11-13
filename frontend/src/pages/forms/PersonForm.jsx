import React, { useContext, useEffect, useMemo, useState } from "react";
import { Box, Button, DialogActions, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../components/inputs/FormTextField";
import FormModal from "../../components/FormModal";
import FormGrid from "../../components/FormGrid";
import axios from "axios";
import FormButtonsGrid from "../../components/FormButtonsGrid";
import FormSelect from "../../components/inputs/FormSelect";

const PersonForm = ({ open, onClose, initialData, editingId }) => {
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
    const { name, dogs } = initialData;

    reset({ name, dogs: dogs.map(({ _id }) => _id) });
  }, [initialData]);

  const onSubmit = async (values) => {
    // TODO: make helper and reuse it in tasks?
    const selectedDogs = values.dogs
      .map((dogId) => {
        const dog = dogs.find(({ _id }) => _id === dogId);

        if (!dog) return;

        return dog;
      })
      .filter((dog) => !!dog);

    const data = {
      name: values.name,
      dogs: selectedDogs,
    };

    const response = (await editingId)
      ? await axios.patch(`/api/people/${editingId}`, data)
      : await axios.post("/api/people", data);

    if (response.status === 200) {
      onClose();
      return;
    }

    // TODO: error handling eventually?
  };

  return (
    <FormProvider {...formMethods}>
      <FormModal onClose={onClose} open={open} title="Person form">
        <FormGrid>
          <FormTextField name="name" label="Name" required />

          <FormSelect
            name="dogs"
            label="Dogs"
            options={dogs.map(({ name, _id }) => ({ value: _id, label: name }))}
          />

          {/*TODO: select with dogs*/}

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

export default PersonForm;
