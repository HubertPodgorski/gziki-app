import React from "react";
import { BottomNavigationAction, Box } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link } from "react-router-dom";

const PickData = () => {
  return (
    <Box>
      PickData
      <Link to={"/data-panel/dogs"}>
        <BottomNavigationAction
          label="Psy"
          // icon={<AdminPanelSettingsIcon />}
        />
      </Link>
      <Link to={"/data-panel/users"}>
        <BottomNavigationAction
          label="Ludzie"
          // icon={<AdminPanelSettingsIcon />}
        />
      </Link>
      <Link to={"/data-panel/events"}>
        <BottomNavigationAction
          label="Treningi"
          // icon={<AdminPanelSettingsIcon />}
        />
      </Link>
    </Box>
  );
};

export default PickData;
