import React from "react";
import { Box } from "@mui/material";

const FormButtonsGrid = ({ children, sx = {} }) => (
  <Box sx={{ display: "grid", gridGap: 16, gridAutoFlow: "column", ...sx }}>
    {children}
  </Box>
);

export default FormButtonsGrid;
