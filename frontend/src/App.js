import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tasks from "./pages/Tasks";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import BottomNavBar from "./components/BottomNavBar";
import { theme } from "./helpers/theme";
import TaskForm from "./pages/TaskForm";
import { TaskContextProvider } from "./contexts/taskFormContext";

const App = () => (
  <div className="App">
    <ThemeProvider theme={theme}>
      <TaskContextProvider>
        <CssBaseline />

        <BrowserRouter>
          {/*TODO: change margin to bottom bar height later on*/}
          <Box sx={{ marginBottom: 8 }}>
            <Routes>
              <Route path="/" element={<Tasks />} />
              <Route path="/add-edit-task" element={<TaskForm />} />
            </Routes>
          </Box>

          <BottomNavBar />
        </BrowserRouter>
      </TaskContextProvider>
    </ThemeProvider>
  </div>
);

export default App;
