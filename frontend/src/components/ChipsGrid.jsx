import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import { Box, styled, useTheme } from "@mui/material";

const WrapperStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyItems: "center",
  gridGap: theme.spacing(2),

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(0.5, 0),
    gridGap: theme.spacing(0.5),
  },
}));

const ChipsGrid = ({ children, sx = {}, dense }) => {
  const theme = useTheme();

  return (
    <WrapperStyled
      sx={{
        ...sx,
        ...(dense
          ? {
              padding: 0,
              [theme.breakpoints.down("md")]: {
                padding: 0,
              },
            }
          : {}),
      }}
    >
      <PetsIcon />
      {children}
    </WrapperStyled>
  );
};

export default ChipsGrid;
