import PutProjects from "@components/Admin/PutProject";
import Admin from "@pages/Admin/Admin";
import Contact from "@pages/Public/Contact";
import Login from "@pages/Admin/Login";
import Projets from "@pages/Public/Projets";
import Navbar from "@components/Layout/Navbar";
import { NavLink, Route, Routes, BrowserRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./App.css";
import "./assets/style/Style.scss";
import "./assets/style/Anims.scss";
import Info from "@pages/Public/Info";
import Home from "@pages/Public/Home";

function App() {
  const [showNav, setShowNav] = useState(false);
  const handleNav = () => {
    setShowNav(!showNav);
  };
  const adminLink = localStorage.getItem("token") ? (
    <li>
      <NavLink style={{ color: "black" }} to="/admin">
        Espace Admin
      </NavLink>
    </li>
  ) : null;
  return (
    <BrowserRouter>
      <ul id="deskNav">
        {adminLink}
        <NavLink to="/">
          {" "}
          <li>Home</li>
        </NavLink>
        <NavLink to="/projets">
          {" "}
          <li> Projets </li>
        </NavLink>
        <NavLink to="/info">
          <li> A propos </li>
        </NavLink>
        <NavLink to="/contact">
          <li> Contact </li>
        </NavLink>
      </ul>
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
        {showNav && <Navbar handleNav={handleNav} adminLink={adminLink} />}
      </div>
      <Routes>
        {/* ADMIN ROADS */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects/:id" element={<PutProjects />} />
        {/* PUBLIC ROADS */}
        <Route path="/projets" element={<Projets />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/info" element={<Info />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
