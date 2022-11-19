import React from "react";
import { Box, styled } from "@mui/material";

const WrapperStyled = styled(Box)(({ theme }) => ({
  display: "grid",
  gridAutoFlow: "row",
  gridGap: 16,
  alignItems: "flex-start",
  padding: 2,

  [theme.breakpoints.down("md")]: {
    padding: 1,
    gridGap: theme.spacing(1),
  },
}));

// Show first tasks in single column
const TasksMainGrid = ({ children }) => (
  <WrapperStyled>{children}</WrapperStyled>
);

export default TasksMainGrid;
