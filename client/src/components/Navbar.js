import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo" >
          Genext-IT
        </div>
        <div className="menu-icon" onClick={handleClick}>
          <li className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Acceuil
            </Link>
          </li>
         
          <li className="nav-item">
            <Link
              to="/offres"
              className="nav-links"
              onClick={closeMobileMenu}
            >
               Nos offres d'emploi
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contactus"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
          
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
