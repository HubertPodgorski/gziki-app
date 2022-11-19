import React from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";
import { adminRoutes, userRoutes } from "../../helpers/routesAndPaths";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import MenuIcon from "@mui/icons-material/Menu";
import LoginLogoutListButton from "../../components/LoginLogoutListButton";

const drawerWidth = 240;

const MenuListItemStyled = styled(ListItemButton)(() => ({
  textAlign: "center",
}));

const UserBottomNavBar = () => {
  const isAdmin = useIsAdmin();

  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Go to
      </Typography>

      <Divider />

      <List>
        <MenuListItemStyled
          onClick={() => {
            navigate(userRoutes.tasks);
          }}
        >
          <FormatListNumberedIcon /> <ListItemText primary="Tasks" />
        </MenuListItemStyled>

        <MenuListItemStyled
          onClick={() => {
            navigate(userRoutes.calendar);
          }}
        >
          <CalendarMonthIcon /> <ListItemText primary="Calendar" />
        </MenuListItemStyled>

        {isAdmin && (
          <MenuListItemStyled
            onClick={() => {
              navigate(adminRoutes.main);
            }}
          >
            <AdminPanelSettingsIcon /> <ListItemText primary="Admin panel" />
          </MenuListItemStyled>
        )}

        <Divider />

        <LoginLogoutListButton />
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Box component="nav">
        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            marginRight: 2,
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default UserBottomNavBar;
