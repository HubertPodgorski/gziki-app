import React from "react";
import { Box, styled } from "@mui/material";

const WrapperStyled = styled(Box)(({ theme }) => ({
  display: "grid",
  gridGap: 16,
  gridAutoFlow: "column",
}));

const FormButtonsGrid = ({ children, sx = {} }) => (
  <WrapperStyled sx={{ ...sx }}>{children}</WrapperStyled>
);

export default FormButtonsGrid;
