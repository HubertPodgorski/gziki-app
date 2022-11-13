import React from "react";
import { Box } from "@mui/material";

const FormButtonsGrid = ({ children }) => (
  <Box sx={{ display: "grid", gridGap: 16, gridAutoFlow: "column" }}>
    {children}
  </Box>
);

export default FormButtonsGrid;
