import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import { Box, styled } from "@mui/material";

const WrapperStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gridGap: theme.spacing(1),
  alignItems: "center",
  justifyItems: "center",
  gridAutoColumns: "max-content",
}));

const DogChipsWrappable = ({ children, sx = {} }) => (
  <WrapperStyled
    sx={{
      ...sx,
    }}
  >
    <PetsIcon />
    {children}
  </WrapperStyled>
);

export default DogChipsWrappable;
