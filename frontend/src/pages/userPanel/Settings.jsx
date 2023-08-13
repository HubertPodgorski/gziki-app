import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { AppContext } from "../../contexts/AppContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const Settings = () => {
  const { subscriptionDetails, setSubscriptionDetails } =
    useContext(AppContext);
  const { user } = useAuthContext();

  const notificationsOn = user._id === subscriptionDetails?.userId;

  return (
    <Box>
      <Typography variant="h4">Settings</Typography>

      <Typography variant="h6">
        {notificationsOn ? "Notifications enabled" : "Notifications disabled"}
      </Typography>
    </Box>
  );
};

export default Settings;
