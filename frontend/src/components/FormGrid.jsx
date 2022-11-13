import React from "react";
import { Box, useTheme } from "@mui/material";

const FormGrid = React.forwardRef(({ children }, ref) => {
  const theme = useTheme();

  return (
    <Box
      ref={ref}
      sx={{
        display: "grid",
        gridAutoFlow: "row",
        gridAutoRows: "auto",
        gridGap: 16,
        maxWidth: 500,
        padding: `${theme.spacing(1)} 0`,
      }}
    >
      {children}
    </Box>
  );
});

export default FormGrid;
