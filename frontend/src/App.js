import { BrowserRouter } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AppContextProvider } from "./contexts/AppContext";
import Router from "./Router";
import theme from "./helpers/theme";
import "dayjs/locale/pl";
import SocketHandler from "./components/SocketHandler";
import { AuthContextProvider } from "./contexts/AuthContext";
import BottomNavBar from "./components/BottomNavBar";
import { ConfirmProvider } from "material-ui-confirm";

const App = () => (
  <ThemeProvider theme={theme}>
    <ConfirmProvider>
      <AuthContextProvider>
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
      </AuthContextProvider>
    </ConfirmProvider>
  </ThemeProvider>
);

export default App;
