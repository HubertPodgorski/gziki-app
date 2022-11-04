import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { FormProvider } from "react-hook-form";

import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Snackbar,
  Typography,
} from "@mui/material";
import TaskFormColumnButtons from "../components/TaskFormColumnButtons";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../contexts/taskFormContext";

const TaskForm = () => {
  const navigate = useNavigate();

  const { initialFormData, setInitialFormData } = useContext(TaskContext);

  const formMethods = useForm({
    defaultValues: {
      dogs: [],
      description: "",
      position: {
        columnIndex: 0,
        rowIndex: 0,
        positionIndex: 0,
      },
    },
  });

  const { handleSubmit, reset } = useMemo(() => formMethods, [formMethods]);

  useEffect(() => {
    if (!initialFormData) return;

    const { description, position, dogs } = initialFormData;

    reset({ description, position, dogs });

    setInitialFormData();
  }, [initialFormData]);

  const [error, setError] = useState("");

  const onSuccessSubmit = async (values) => {
    console.log("values => ", values);
    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // TODO: update list on save

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError("");
      navigate("/");
    }
  };

  // TODO: change to useForm so I can change default value on context change
  return (
    <FormProvider {...formMethods} onSubmit={handleSubmit(onSuccessSubmit)}>
      <Card sx={{ minWidth: 275, maxWidth: 500, margin: "20px auto" }}>
        <CardContent
          sx={{
            display: "grid",
            alignItems: "center",
            justifyItems: "stretch",
            gridGap: 8,
          }}
        >
          {/*add this as an alternative to description*/}
          {/*<AutocompleteElement*/}
          {/*  options={[]}*/}
          {/*  name="description"*/}
          {/*  label="Opis"*/}
          {/*  required*/}
          {/*/>*/}

          <TextFieldElement name="description" label="Opis" required />

          <TextFieldElement
            name="position.rowIndex"
            label="Kolejnośc"
            required
            type="number"
            min={0}
          />

          <TextFieldElement
            name="position.positionIndex"
            label="Kolejnośc w wierszu"
            required
            type="number"
          />

          <TaskFormColumnButtons />
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit">Dodaj</Button>
        </CardActions>

        <Snackbar open={!!error} onClose={() => setError("")}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      </Card>
    </FormProvider>
  );
};

export default TaskForm;
