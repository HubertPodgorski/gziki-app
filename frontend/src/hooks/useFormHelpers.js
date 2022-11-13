import { useState } from "react";
import { getInitialTaskFormData } from "../pages/forms/TaskForm";

export const useFormHelpers = (initialFormData) => {
  const [formInitialData, setFormInitialData] = useState(initialFormData);
  const [editingId, setEditingId] = useState();
  const [formOpen, setFormOpen] = useState(false);

  const handleEditClick = async (formEditInitialData, id) => {
    await setFormInitialData(formEditInitialData);

    await setEditingId(id);

    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingId(undefined);
    setFormInitialData(initialFormData);
  };

  return {
    formInitialData,
    editingId,
    formOpen,
    setFormOpen,
    handleEditClick,
    handleFormClose,
  };
};
