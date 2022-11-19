import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import { Box, styled } from "@mui/material";

const WrapperStyled = styled(Box)(({ theme }) => ({
  overflowX: "scroll",
  display: "grid",
  gridAutoFlow: "column",
  gridGap: theme.spacing(1),
  alignItems: "center",
  justifyItems: "center",
  gridAutoColumns: "max-content",

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2, 0),
  },
}));

const DogChipsGrid = ({ children, sx = {} }) => (
  <WrapperStyled sx={{ ...sx }}>
    <PetsIcon />
    {children}
  </WrapperStyled>
);

export default DogChipsGrid;
