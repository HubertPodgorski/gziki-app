import React from "react";
import { Box, useTheme } from "@mui/material";

const TasksRow = ({ children, rowIndex, userPanel }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        gridRow: `${Number(rowIndex) + 1} / ${Number(rowIndex) + 2}`,
        display: "grid",
        gridGap: theme.spacing(2),
        gridTemplateColumns: "1fr 1fr",
        border: userPanel ? "1px solid #ddd" : "none",
        borderRadius: "6px",
      }}
    >
      {children}
    </Box>
  );
};

export default TasksRow;
