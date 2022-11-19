import React from "react";
import { ListItemButton, ListItemText, styled } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { notAuthenticatedRoutes } from "../helpers/routesAndPaths";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const MenuListItemStyled = styled(ListItemButton)(() => ({
  textAlign: "center",
}));

const LoginLogoutListButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  return (
    <MenuListItemStyled
      onClick={() => {
        logout();
        navigate(notAuthenticatedRoutes.login);
      }}
    >
      <LogoutRoundedIcon /> <ListItemText primary="Logout" />
    </MenuListItemStyled>
  );
};

export default LoginLogoutListButton;
