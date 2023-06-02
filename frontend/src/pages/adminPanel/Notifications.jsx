import React, { useMemo } from "react";
import { Box, Button, DialogActions, Typography } from "@mui/material";
import { useSocketContext } from "../../hooks/useSocketContext";
import { FormProvider, useForm } from "react-hook-form";
import FormGrid from "../../components/FormGrid";
import FormSingleAutocomplete from "../../components/inputs/FormSingleAutocomplete";

const notificationTitleOptions = [
  "Tasks updated",
  "Fill attendance PRETTY PLEASE!",
];

const defaultValues = { title: "" };

const Settings = () => {
  const { socket } = useSocketContext();

  const formMethods = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = useMemo(() => formMethods, [formMethods]);

  const onSubmit = async ({ title }) => {
    console.log("title => ", title);
    await socket.emit("send_notification", {
      title,
    });

    reset(defaultValues);
  };

  return (
    <Box>
      <Typography variant="h4">Notifications</Typography>

      <FormProvider {...formMethods}>
        <FormGrid>
          <FormSingleAutocomplete
            required
            name="title"
            label="Notification title"
            multi={false}
            options={notificationTitleOptions}
          />

          <DialogActions sx={{ padding: 0 }}>
            <Button
              size="medium"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Send notifications
            </Button>
          </DialogActions>
        </FormGrid>
      </FormProvider>
    </Box>
  );
};

export default Settings;
