import PutProjects from "@components/PutProject";
import Admin from "@pages/Admin";
import Login from "@pages/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects/:id" element={<PutProjects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
