import React, { useContext, useEffect, useMemo } from "react";
import { Box, Button, DialogActions, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../components/inputs/FormTextField";
import FormModal from "../../components/FormModal";
import FormGrid from "../../components/FormGrid";
import axios from "axios";
import FormButtonsGrid from "../../components/FormButtonsGrid";

const DogForm = ({ open, onClose, initialData, editingId }) => {
  const formMethods = useForm({
    defaultValues: initialData,
  });

  const { handleSubmit, reset } = useMemo(() => formMethods, [formMethods]);

  useEffect(() => {
    const { name } = initialData;

    reset({ name });
  }, [initialData]);

  const onSubmit = async ({ name }) => {
    const data = { name };
    const response = editingId
      ? await axios.patch(`/api/dogs/${editingId}`, data)
      : await axios.post("/api/dogs", data);

    if (response.status === 200) {
      onClose();
      return;
    }

    // TODO: error handling eventually?
  };

  return (
    <FormProvider {...formMethods}>
      <FormModal onClose={onClose} open={open} title="Dog form">
        <FormGrid>
          <FormTextField name="name" label="Name" required />

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

export default DogForm;
