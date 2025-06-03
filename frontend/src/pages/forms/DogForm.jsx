import React, { useEffect, useMemo } from "react";
import { Button, DialogActions } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../components/inputs/FormTextField";
import FormModal from "../../components/FormModal";
import FormGrid from "../../components/FormGrid";
import { useSocketContext } from "../../hooks/useSocketContext";

const DogForm = ({ open, onClose, initialData, editingId }) => {
  const { socket } = useSocketContext();

  const formMethods = useForm({
    defaultValues: initialData,
  });

  const { handleSubmit, reset } = useMemo(() => formMethods, [formMethods]);

  useEffect(() => {
    const { name } = initialData;

    reset({ name });
  }, [initialData, reset]);

  const onSubmit = async ({ name }) => {
    const data = { name };

    if (editingId) {
      await socket.emit("update_dog", { _id: editingId, ...data }, () =>
        onClose()
      );
    } else {
      await socket.emit("add_dog", data, () => onClose());
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
