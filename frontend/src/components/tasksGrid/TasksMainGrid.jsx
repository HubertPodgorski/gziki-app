import React from "react";
import { Box } from "@mui/material";

// Show first tasks in single column
const TasksMainGrid = ({ children }) => (
  <Box
    sx={{
      display: "grid",
      gridAutoFlow: "row",
      gridGap: 16,
      alignItems: "flex-start",
      padding: 2,
    }}
  >
    {children}
  </Box>
);

export default TasksMainGrid;
