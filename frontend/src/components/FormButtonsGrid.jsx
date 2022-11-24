import React from "react";
import { Box, styled } from "@mui/material";

const WrapperStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  gridGap: 16,
  flexWrap: "wrap",
}));

const FormButtonsGrid = ({ children, sx = {} }) => (
  <WrapperStyled sx={{ ...sx }}>{children}</WrapperStyled>
);

export default FormButtonsGrid;
