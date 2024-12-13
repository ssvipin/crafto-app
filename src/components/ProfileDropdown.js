import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/ProfileDropdown.css";
import profile from '../Assets/profile.png'
const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token or handle logout logic
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="profile-dropdown">
      <div className="profile-avatar" onClick={toggleDropdown}>
        <img className="avatar" src={profile} alt="User Avatar" />
        <span className="dropdown-arrow">▼</span>
      </div>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div onClick={() => navigate("/profile")}>View Profile</div>
          <div onClick={() => navigate("/settings")}>Settings</div>
          <div onClick={handleLogout}>Logout</div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
