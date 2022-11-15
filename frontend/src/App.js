import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppContextProvider } from "./contexts/AppContext";
import Router from "./Router";
import theme from "./helpers/theme";
import "dayjs/locale/pl";
import SocketHandler from "./components/SocketHandler";
import { AuthContextProvider } from "./contexts/AuthContext";

const App = () => (
  <ThemeProvider theme={theme}>
    <AuthContextProvider>
      <AppContextProvider>
        <SocketHandler />

        <CssBaseline />

        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AppContextProvider>
    </AuthContextProvider>
  </ThemeProvider>
);

export default App;
