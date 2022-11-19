import React from "react";
import { Box, styled } from "@mui/material";

const WrapperStyled = styled(Box)(({ theme }) => ({
  display: "grid",
  gridGap: theme.spacing(2),
  gridTemplateColumns: "1fr 1fr",
  borderRadius: "6px",

  [theme.breakpoints.down("md")]: {
    gridGap: theme.spacing(1),
  },
}));

const TasksRow = ({ children, rowIndex, userPanel }) => (
  <WrapperStyled
    sx={{
      gridRow: `${Number(rowIndex) + 1} / ${Number(rowIndex) + 2}`,
      border: userPanel ? "1px solid #ddd" : "none",
    }}
  >
    {children}
  </WrapperStyled>
);

export default TasksRow;
