import React from "react";
import { Paper, useTheme } from "@mui/material";

const CenteredContent = ({ children }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        top: 2,
        minWidth: 400,
        padding: 2,
        height: "fit-content",

        [theme.breakpoints.down("md")]: {
          padding: 1,
          top: 1,
          minWidth: 300,
        },
      }}
    >
      {children}
    </Paper>
  );
};
export default CenteredContent;
