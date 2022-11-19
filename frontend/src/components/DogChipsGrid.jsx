import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import { Box, useTheme } from "@mui/material";

const DogChipsGrid = ({ children, sx = {} }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        overflowX: "scroll",
        display: "grid",
        gridAutoFlow: "column",
        gridGap: theme.spacing(1),
        alignItems: "center",
        justifyItems: "center",
        gridAutoColumns: "max-content",
        ...sx,
        [theme.breakpoints.down("md")]: {
          padding: theme.spacing(2, 0),
        },
      }}
    >
      <PetsIcon />
      {children}
    </Box>
  );
};

export default DogChipsGrid;
