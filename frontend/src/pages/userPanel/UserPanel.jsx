import React from "react";
import { Outlet } from "react-router-dom";
import UserBottomNavBar from "./UserBottomNavBar";
import { Box, useTheme } from "@mui/material";

const UserPanel = () => {
  const theme = useTheme();

  return (
    <Box sx={{ marginBottom: theme.spacing(7) }}>
      <Outlet />

      <UserBottomNavBar />
    </Box>
  );
};

export default UserPanel;
