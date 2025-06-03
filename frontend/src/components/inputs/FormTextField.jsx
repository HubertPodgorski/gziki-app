import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

const FormTextField = ({
  name,
  label,
  required = false,
  type,
  rules = {},
  rows = 1,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required, ...rules }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          onChange={onChange}
          value={value}
          label={label}
          required={required}
          type={type}
          error={!!error}
          helperText={error?.message ?? ""}
          multiline={rows > 1}
          rows={rows}
        />
      )}
    />
  );
};

export default FormTextField;
