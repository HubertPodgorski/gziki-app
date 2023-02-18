import React, { useCallback } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const FormSelect = ({
  options,
  name,
  label,
  multi = true,
  onChange,
  value,
}) => {
  const { control } = useFormContext();

  const generateSelectOptions = useCallback(() => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  }, [options]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange: formOnChange, value: formValue } }) => (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            onChange={onChange ? onChange : formOnChange}
            value={value ? value : formValue}
            label={label}
            multiple={multi}
            defaultValue={formValue}
            MenuProps={{ sx: { maxHeight: "70vh" } }}
          >
            {generateSelectOptions()}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default FormSelect;
