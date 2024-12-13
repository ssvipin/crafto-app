import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import "./Styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="navbar-logo" onClick={() => navigate("/quotes")}>
          Kutumb
        </div>
        <div className="navbar-hamburger" onClick={toggleMenu}>
          <span className="hamburger-icon">☰</span>
        </div>
      </div>
      <nav className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <a onClick={() => navigate("/quotes")}>Home</a>
        <a onClick={() => navigate("/members")}>Members</a>
        <a onClick={() => navigate("/notifications")}>Notifications</a>
        <ProfileDropdown />
      </nav>
    </header>
  );
};

export default Navbar;
