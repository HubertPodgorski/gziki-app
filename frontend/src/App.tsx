import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AppContextProvider } from "./contexts/AppContext";
import Router from "./Router";
import theme from "./helpers/theme";
import SocketHandler from "./components/SocketHandler";
import { AuthContextProvider } from "./contexts/AuthContext";
import BottomNavBar from "./components/BottomNavBar";
import { ConfirmProvider } from "material-ui-confirm";
import { SnackbarProvider } from "notistack";
import { SocketContextProvider } from "./contexts/SocketContext.jsx";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { pl } from "date-fns/locale/pl";

const App = () => (
  <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3}>
      <ConfirmProvider>
        <AuthContextProvider>
          <SocketContextProvider>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={pl}
            >
              <AppContextProvider>
                <SocketHandler />

                <CssBaseline />

                <BrowserRouter>
                  <Box
                    sx={{
                      padding: theme.spacing(2, 2, 9, 2),
                      [theme.breakpoints.down("md")]: {
                        gridGap: theme.spacing(1),
                        padding: theme.spacing(1, 1, 9, 1),
                      },
                    }}
                  >
                    <Router />

                    <BottomNavBar />
                  </Box>
                </BrowserRouter>
              </AppContextProvider>
            </LocalizationProvider>
          </SocketContextProvider>
        </AuthContextProvider>
      </ConfirmProvider>
    </SnackbarProvider>
  </ThemeProvider>
);

export default App;
