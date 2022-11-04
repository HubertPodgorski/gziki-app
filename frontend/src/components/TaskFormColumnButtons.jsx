import React from "react";
import { Box, IconButton } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useFormContext, useWatch } from "react-hook-form";

const fieldName = "position.columnIndex";

const TaskFormColumnButtons = () => {
  const { setValue } = useFormContext();

  const value = useWatch({ name: fieldName });

  console.log("value => ", value);

  return (
    <Box
      sx={{
        display: "grid",
        gridGap: 8,
        gridAutoFlow: "column",
        justifyItems: "center",
      }}
    >
      <IconButton
        onClick={() => setValue(fieldName, 0)}
        aria-selected={true}
        color={+value === 0 ? "success" : "primary"}
      >
        <KeyboardArrowLeftOutlinedIcon sx={{ minWidth: 46, minHeight: 46 }} />
      </IconButton>

      <IconButton
        onClick={() => setValue(fieldName, 1)}
        color={+value === 1 ? "success" : "primary"}
      >
        <KeyboardArrowRightOutlinedIcon sx={{ minWidth: 46, minHeight: 46 }} />
      </IconButton>
    </Box>
  );
};

export default TaskFormColumnButtons;
