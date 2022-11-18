import React from "react";
import { Paper } from "@mui/material";

const CenteredContent = ({ children }) => {
  return (
    <Paper
      sx={{
        top: 2,
        minWidth: 400,
        padding: 2,
        height: "fit-content",
      }}
    >
      {children}
    </Paper>
  );
};
export default CenteredContent;
