import React, { useEffect, useMemo } from "react";
import { Dog } from "../../helpers/types";
import { Button, DialogActions } from "@mui/material";
import { useSocketContext } from "../../hooks/useSocketContext";
import { FormProvider, useForm } from "react-hook-form";
import FormModal from "./../FormModal.jsx";
import FormGrid from "./../FormGrid.jsx";
import FormTextField from "./../inputs/FormTextField.jsx";

interface Props {
  open: boolean;
  onClose: () => void;
  dog?: Dog;
}

interface FormData {
  note: string;
}

const NoteModal = ({ dog, open, onClose }: Props) => {
  const { socket } = useSocketContext();

  const formMethods = useForm<FormData>({
    defaultValues: { note: dog?.note || "" },
  });

  const { handleSubmit, reset } = useMemo(() => formMethods, [formMethods]);

  useEffect(() => {
    if (!dog) return;

    reset({ note: dog.note || "" });
  }, [dog, reset]);

  const onSubmit = async ({ note }) => {
    if (!dog) return;

    await socket.emit("update_dog", { _id: dog._id, note: note || "" }, () =>
      onClose()
    );

    // TODO: error handling eventually?
  };

  return (
    <FormProvider {...formMethods}>
      <FormModal
        open={open}
        onClose={onClose}
        title={`${dog?.name ?? "Dog"}'s notes`}
      >
        <FormGrid>
          <FormTextField name="note" label="Notes" rows={5} />

          <DialogActions sx={{ padding: 0 }}>
            <Button size="medium" variant="outlined" onClick={onClose}>
              Cancel
            </Button>

            <Button
              size="medium"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Save notes
            </Button>
          </DialogActions>
        </FormGrid>
      </FormModal>
    </FormProvider>
  );
};

export default NoteModal;
