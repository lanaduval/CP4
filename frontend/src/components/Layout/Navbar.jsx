import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Navbar() {
  return (
    <div className="navContainer">
      <div className="navbar">
        <ul>
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
      </div>
    </div>
  );
}
