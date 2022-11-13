import React from "react";
import { Outlet } from "react-router-dom";
import AdminBottomNavBar from "./AdminBottomNavBar";
import { Box } from "@mui/material";

const AdminPanel = () => {
  // TODO: if logged in with admin rights
  // Secure it

  return (
    <>
      <Box sx={{ paddingBottom: 7 }}>
        <Outlet />
      </Box>

      <AdminBottomNavBar />
    </>
  );
};

export default AdminPanel;
