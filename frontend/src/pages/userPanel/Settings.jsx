import React from "react";
import { Box, Button, Typography } from "@mui/material";
import theme from "../../helpers/theme";
import { subscribe } from "../../helpers/serviceWorkerHelpers";
import { useSocketContext } from "../../hooks/useSocketContext";

const Settings = () => {
  const { socket } = useSocketContext();

  return (
    <Box>
      <Typography variant="h4">Settings</Typography>

      <Button
        variant="contained"
        onClick={() => subscribe(socket)}
        sx={{ marginTop: theme.spacing(2) }}
      >
        Allow notifications
      </Button>
    </Box>
  );
};

export default Settings;
