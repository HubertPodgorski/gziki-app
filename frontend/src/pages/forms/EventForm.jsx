import React, { useEffect, useMemo } from "react";
import { Button, DialogActions } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../components/inputs/FormTextField";
import FormModal from "../../components/FormModal";
import FormGrid from "../../components/FormGrid";
import FormDatePicker from "../../components/inputs/FormDatePicker";
import { eventTypeOptions } from "../../components/inputs/consts";
import FormSelect from "../../components/inputs/FormSelect";
import { useSocketContext } from "../../hooks/useSocketContext";

const EventForm = ({ open, onClose, initialData, editingId }) => {
  const { socket } = useSocketContext();
  const formMethods = useForm({
    defaultValues: initialData,
  });

  const { handleSubmit, reset } = useMemo(() => formMethods, [formMethods]);

  useEffect(() => {
    const { name, date, type } = initialData;

    reset({ name, date, type });
  }, [initialData, reset]);

  const onSubmit = async (values) => {
    const data = {
      name: values.name,
      date: values.date,
      type: values.type,
    };

    if (editingId) {
      socket.emit("update_event", { ...data, _id: editingId }, () => {
        onClose();
      });
    } else {
      socket.emit("add_event", data, () => {
        onClose();
      });
    }

    // TODO: error handling eventually?
  };

  return (
    <FormProvider {...formMethods}>
      <FormModal onClose={onClose} open={open} title="Event">
        <FormGrid>
          <FormSelect
            multi={false}
            name="type"
            options={eventTypeOptions}
            label="Event type"
          />

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
