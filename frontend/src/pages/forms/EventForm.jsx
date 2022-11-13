import React, { useContext, useEffect, useMemo, useState } from "react";
import { Box, Button, DialogActions, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../components/inputs/FormTextField";
import FormModal from "../../components/FormModal";
import FormGrid from "../../components/FormGrid";
import axios from "axios";
import FormButtonsGrid from "../../components/FormButtonsGrid";
import FormSelect from "../../components/inputs/FormSelect";
import FormDatePicker from "../../components/inputs/FormDatePicker";

const EventForm = ({ open, onClose, initialData, editingId }) => {
  const formMethods = useForm({
    defaultValues: initialData,
  });

  const { handleSubmit, reset } = useMemo(() => formMethods, [formMethods]);

  useEffect(() => {
    const { name, date } = initialData;

    reset({ name, date });
  }, [initialData]);

  const onSubmit = async (values) => {
    const data = {
      name: values.name,
      date: values.date,
    };

    const response = editingId
      ? await axios.patch(`/api/events/${editingId}`, data)
      : await axios.post("/api/events", data);

    if (response.status === 200) {
      onClose();
      return;
    }

    // TODO: error handling eventually?
  };

  return (
    <FormProvider {...formMethods}>
      <FormModal onClose={onClose} open={open} title="Event">
        <FormGrid>
          <FormTextField name="name" label="Name" required />

          <FormDatePicker name="date" label="Date" />

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

export default EventForm;
