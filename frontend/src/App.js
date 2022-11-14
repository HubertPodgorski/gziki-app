import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppContextProvider } from "./contexts/AppContext";
import Router from "./Router";
import theme from "./helpers/theme";
import "dayjs/locale/pl";
import SocketHandler from "./components/SocketHandler";

const App = () => (
  <div className="App">
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <SocketHandler />

        <CssBaseline />

        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AppContextProvider>
    </ThemeProvider>
  </div>
);

export default App;
