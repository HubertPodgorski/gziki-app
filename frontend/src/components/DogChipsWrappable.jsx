import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import { Box, useTheme } from "@mui/material";

const DogChipsWrappable = ({ children, sx = {} }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gridGap: theme.spacing(1),
        alignItems: "center",
        justifyItems: "center",
        gridAutoColumns: "max-content",
        ...sx,
      }}
    >
      <PetsIcon />
      {children}
    </Box>
  );
};

export default DogChipsWrappable;
