import React from "react";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { StaticDateTimePicker } from "@mui/x-date-pickers";

const FormDatePicker = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field: { onChange, value } }) => (
        <StaticDateTimePicker
          showToolbar={true}
          components={{
            ActionBar: () => <></>,
          }}
          label={label}
          displayStaticWrapperAs="mobile"
          openTo="day"
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      )}
    />
  );
};

export default FormDatePicker;
