import React, { useContext, useEffect, useMemo } from "react";
import { Button, DialogActions } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../components/inputs/FormTextField";
import FormModal from "../../components/FormModal";
import FormGrid from "../../components/FormGrid";
import FormSelect from "../../components/inputs/FormSelect";
import { AppContext } from "../../contexts/AppContext";
import { socket } from "../../components/SocketHandler";

const TaskForm = ({ open, onClose, initialData, editingId, maxRowIndex }) => {
  const { dogs, dogTasks } = useContext(AppContext);

  const formMethods = useForm({
    defaultValues: initialData,
  });

  const { handleSubmit, reset, watch, setValue } = useMemo(
    () => formMethods,
    [formMethods]
  );

  useEffect(() => {
    const { description, dogs, position } = initialData;

    reset({ description, dogs: dogs.map(({ _id }) => _id), position });
  }, [initialData]);

  const onSubmit = async (values) => {
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
      position: {
        ...values.position,
        rowIndex: editingId ? values.position.rowIndex : maxRowIndex,
      },
    };

    if (editingId) {
      socket.emit("update_task", { ...data, _id: editingId }, () => {
        onClose();
      });
    } else {
      socket.emit("add_task", data, () => {
        onClose();
      });
    }

    // TODO: error handling eventually?
  };

  const dogTaskOptions = useMemo(
    () => dogTasks.map(({ name }) => ({ value: name, label: name })),
    [dogTasks]
  );

  const description = watch("description");

  return (
    <FormProvider {...formMethods}>
      <FormModal onClose={onClose} open={open} title="Task">
        <FormGrid>
          <FormTextField
            name="description"
            label="Type task description"
            required
          />
          <FormSelect
            name="description"
            value={description ? [description] : []}
            onChange={(e) => {
              if (e.target.value && e.target.value[0]) {
                setValue("description", e.target.value[0]);
              }
            }}
            label="Or select description"
            options={dogTaskOptions}
          />

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
