import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import { Box, styled } from "@mui/material";

const WrapperStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyItems: "center",
  gridGap: theme.spacing(2),

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1, 0),
    gridGap: theme.spacing(1),
  },
}));

const ChipsGrid = ({ children, sx = {} }) => (
  <WrapperStyled sx={{ ...sx }}>
    <PetsIcon />
    {children}
  </WrapperStyled>
);

export default ChipsGrid;
