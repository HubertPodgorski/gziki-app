import React from "react";
import { Paper, useTheme, styled } from "@mui/material";

const WrapperStyled = styled(Paper)(({ theme }) => ({
  top: 2,
  minWidth: 400,
  padding: 2,
  height: "fit-content",

  [theme.breakpoints.down("md")]: {
    padding: 1,
    top: 1,
    minWidth: 300,
  },
}));

const CenteredContent = ({ children }) => (
  <WrapperStyled>{children}</WrapperStyled>
);
export default CenteredContent;
