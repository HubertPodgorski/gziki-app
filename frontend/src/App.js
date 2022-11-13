import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { TaskContextProvider } from "./contexts/taskFormContext";
import Router from "./Router";
import theme from "./helpers/theme";
import "dayjs/locale/pl";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const App = () => (
  <div className="App">
    <ThemeProvider theme={theme}>
      <TaskContextProvider>
        <CssBaseline />

        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </TaskContextProvider>
    </ThemeProvider>
  </div>
);

export default App;
