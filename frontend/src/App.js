import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tasks from "./pages/Tasks";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Box>
          <Routes>
            <Route path="/" element={<Tasks />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
