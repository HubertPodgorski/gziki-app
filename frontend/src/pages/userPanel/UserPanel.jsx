import React from "react";
import { Outlet } from "react-router-dom";
import UserBottomNavBar from "./UserBottomNavBar";

const UserPanel = () => {
  return (
    <>
      <Outlet />

      <UserBottomNavBar />
    </>
  );
};

export default UserPanel;
