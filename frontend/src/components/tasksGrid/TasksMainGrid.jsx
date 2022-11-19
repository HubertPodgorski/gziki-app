import React from "react";
import { Box, useTheme } from "@mui/material";

// Show first tasks in single column
const TasksMainGrid = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "grid",
        gridAutoFlow: "row",
        gridGap: 16,
        alignItems: "flex-start",
        padding: 2,

        [theme.breakpoints.down("md")]: {
          padding: 1,
          gridGap: theme.spacing(1),
        },
      }}
    >
      {children}
    </Box>
  );
};

export default TasksMainGrid;
