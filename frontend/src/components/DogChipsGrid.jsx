import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import { Box, useTheme } from "@mui/material";

const DogChipsGrid = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "grid",
        gridAutoFlow: "column",
        gridGap: theme.spacing(1),
        alignItems: "center",
        justifyItems: "center",
        gridAutoColumns: "max-content",
      }}
    >
      <PetsIcon />
      {children}
    </Box>
  );
};

export default DogChipsGrid;
