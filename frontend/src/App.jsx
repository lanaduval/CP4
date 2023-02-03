import PutProjects from "@components/Admin/PutProject";
import Admin from "@pages/Admin/Admin";
import Contact from "@pages/Public/Contact";
import Login from "@pages/Admin/Login";
import Projets from "@pages/Public/Projets";
import Navbar from "@components/Layout/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  const [showNav, setShowNav] = useState(false);
  const handleNav = () => {
    setShowNav(!showNav);
  };
  return (
    <BrowserRouter>
      <div className="navContainer">
        <button type="button" onClick={handleNav}>
          {" "}
          <FontAwesomeIcon
            className="fab fa-react fa-2x"
            style={{
              color: "#FFF",
              marginInline: "1rem",
              paddingBlock: "1rem",
            }}
            icon={faBars}
          />{" "}
        </button>
        {showNav && <Navbar handleNav={handleNav} />}
      </div>
      <Routes>
        {/* ADMIN ROADS */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects/:id" element={<PutProjects />} />
        {/* PUBLIC ROADS */}
        <Route path="/projets" element={<Projets />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
