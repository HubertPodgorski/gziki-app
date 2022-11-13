import React from "react";
import { Box, useTheme } from "@mui/material";

const TasksRow = ({ children, rowIndex }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        gridRow: `${Number(rowIndex) + 1} / ${Number(rowIndex) + 2}`,
        display: "grid",
        gridGap: theme.spacing(2),
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      {children}
    </Box>
  );
};

export default TasksRow;
