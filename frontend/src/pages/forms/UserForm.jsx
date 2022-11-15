import React, { useContext, useEffect, useMemo } from "react";
import { Button, DialogActions } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../components/inputs/FormTextField";
import FormModal from "../../components/FormModal";
import FormGrid from "../../components/FormGrid";
import FormSelect from "../../components/inputs/FormSelect";
import { AppContext } from "../../contexts/AppContext";
import { socket } from "../../components/SocketHandler";

const UserForm = ({ open, onClose, initialData, editingId }) => {
  const { dogs } = useContext(AppContext);

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

    if (editingId) {
      socket.emit("update_user", { ...data, _id: editingId }, () => onClose());
    } else {
      socket.emit("add_user", data, () => onClose());
    }

    // TODO: error handling eventually?
  };

  return (
    <FormProvider {...formMethods}>
      <FormModal onClose={onClose} open={open} title="User form">
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

export default UserForm;
