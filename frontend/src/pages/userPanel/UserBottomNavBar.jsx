import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link } from "react-router-dom";
import { adminRoutes, userRoutes } from "../../helpers/routesAndPaths";

// TODO: add correct button, redirect to calendar, panel and adding tasks
// TODO: change to app bar from MUI
const UserBottomNavBar = () => (
  <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation showLabels>
      <Link to={userRoutes.tasks}>
        <BottomNavigationAction
          label="Lista"
          icon={<FormatListNumberedIcon />}
        />
      </Link>

      <Link to={userRoutes.calendar}>
        <BottomNavigationAction label="Treningi" icon={<CalendarMonthIcon />} />
      </Link>

      {/*TODO: show it only if has admin rights*/}
      <Link to={adminRoutes.main}>
        <BottomNavigationAction
          label="Panel zarządzania"
          icon={<AdminPanelSettingsIcon />}
        />
      </Link>
    </BottomNavigation>
  </Paper>
);

export default UserBottomNavBar;
