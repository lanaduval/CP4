import Admin from "@pages/Admin";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
