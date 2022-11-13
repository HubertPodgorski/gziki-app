import React, { useCallback } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import {
  CalendarPicker,
  LocalizationProvider,
  StaticDatePicker,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FormDatePicker = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
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
    </LocalizationProvider>
  );
};

export default FormDatePicker;
