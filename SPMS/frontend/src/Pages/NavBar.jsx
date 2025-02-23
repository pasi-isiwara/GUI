import React from "react";
import "../Styles/Navbar.css"; // Import the CSS file

const NavBar = () => {
  return (
    <nav>
      <h2>SPMS</h2>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/all-courses">Courses</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
