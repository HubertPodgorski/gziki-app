import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { Link } from "react-router-dom";

// TODO: add correct button, redirect to calendar, panel and adding tasks
// TODO: change to app bar from MUI
const BottomNavBar = () => {
  const [value, setValue] = useState(0);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        {/*value={}*/}
        <Link to="/">
          <BottomNavigationAction
            label="Lista"
            icon={<FormatListNumberedIcon />}
          />
        </Link>
        {/*TODO: maybe open modal? Figure that out later*/}
        {/*TODO: move me to consts*/}
        <Link to={"/add-edit-task"}>
          <BottomNavigationAction
            label="Nowy"
            icon={<ControlPointOutlinedIcon />}
          />
        </Link>
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar;
