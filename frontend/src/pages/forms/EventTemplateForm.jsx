import React, { useContext, useEffect, useMemo } from "react";
import { Button, DialogActions } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../components/inputs/FormTextField";
import FormModal from "../../components/FormModal";
import FormGrid from "../../components/FormGrid";
import { socket } from "../../components/SocketHandler";
import { AppContext } from "../../contexts/AppContext";
import { getFormattedDate } from "../../helpers/calendar";
import FormSelect from "../../components/inputs/FormSelect";

const EventTemplateForm = ({ open, onClose, initialData, editingId }) => {
  const { events } = useContext(AppContext);

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
      await socket.emit(
        "update_event_template",
        { _id: editingId, ...data },
        () => onClose()
      );
    } else {
      await socket.emit("add_event_template", data, () => onClose());
    }

    // TODO: error handling eventually?
  };

  const eventNamesOptions = useMemo(
    () =>
      events.map(({ name, date }) => {
        const formattedValue = `${name} ${getFormattedDate(date)}`;

        return {
          value: formattedValue,
          label: formattedValue,
        };
      }),
    [events]
  );

  const name = formMethods.watch("name");

  return (
    <FormProvider {...formMethods}>
      <FormModal onClose={onClose} open={open} title="Event template form">
        <FormGrid>
          <FormTextField name="name" label="Name" required />

          <FormSelect
            onChange={(e) => {
              formMethods.setValue("name", e.target.value ?? "");
            }}
            value={name}
            name="name"
            label="Name"
            multi={false}
            options={eventNamesOptions}
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

export default EventTemplateForm;
