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
import PetsIcon from "@mui/icons-material/Pets";
import PersonIcon from "@mui/icons-material/Person";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import WindowIcon from "@mui/icons-material/Window";
import HomeIcon from "@mui/icons-material/Home";

// TODO: add correct button, redirect to calendar, panel and adding tasks
// TODO: change to app bar from MUI
const UserBottomNavBar = () => (
  <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation showLabels sx={{ alignItems: "center" }}>
      <Link to={userRoutes.main}>
        <BottomNavigationAction icon={<HomeIcon />} />
      </Link>

      <Link to={adminRoutes.tasks}>
        <BottomNavigationAction icon={<FormatListBulletedIcon />} />
      </Link>

      <Link to={adminRoutes.dogs}>
        <BottomNavigationAction icon={<PetsIcon />} />
      </Link>

      <Link to={adminRoutes.events}>
        <BottomNavigationAction icon={<CalendarMonthIcon />} />
      </Link>

      <Link to={adminRoutes.users}>
        <BottomNavigationAction icon={<PersonIcon />} />
      </Link>
    </BottomNavigation>
  </Paper>
);

export default UserBottomNavBar;
