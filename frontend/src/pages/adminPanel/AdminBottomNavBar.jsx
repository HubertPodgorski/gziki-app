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
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HomeIcon from "@mui/icons-material/Home";

import { useNavigate } from "react-router-dom";
import { adminRoutes, userRoutes } from "../../helpers/routesAndPaths";
import LoginLogoutListButton from "../../components/LoginLogoutListButton";

const drawerWidth = 240;

const MenuListItemStyled = styled(ListItemButton)(() => ({
  textAlign: "center",
}));

const UserBottomNavBar = () => {
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
            navigate(userRoutes.main);
          }}
        >
          <HomeIcon />
          <ListItemText primary="Home" />
        </MenuListItemStyled>

        <MenuListItemStyled
          onClick={() => {
            navigate(adminRoutes.tasks);
          }}
        >
          <FormatListBulletedIcon />
          <ListItemText primary="Tasks" />
        </MenuListItemStyled>

        <MenuListItemStyled
          onClick={() => {
            navigate(adminRoutes.dogs);
          }}
        >
          <PetsIcon />
          <ListItemText primary="Pets" />
        </MenuListItemStyled>

        <MenuListItemStyled
          onClick={() => {
            navigate(adminRoutes.events);
          }}
        >
          <CalendarMonthIcon />
          <ListItemText primary="Calendar" />
        </MenuListItemStyled>

        <MenuListItemStyled
          onClick={() => {
            navigate(adminRoutes.users);
          }}
        >
          <PersonIcon />
          <ListItemText primary="Users" />
        </MenuListItemStyled>

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
        {/*<StyledFab color="secondary" aria-label="add">*/}
        {/*  <AddIcon />*/}
        {/*</StyledFab>*/}

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
