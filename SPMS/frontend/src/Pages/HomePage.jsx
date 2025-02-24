import React from 'react';
import NavBar from "./NavBar";
import "../Styles/HomePage.css";

export const HomePage = () => {
  return (
    <div style={{ textAlign: "left", padding: "20px" }}>
      <NavBar />
      <h1>Welcome User</h1>
      <h2>Course Categories</h2>
      <ul>
        <li>
          <strong>Electrical Engineering</strong>
          <ul>
            <li><a href="/Course">Module 1</a></li>
            <li><a href="/Course">Module 2</a></li>
            <li><a href="/Course">Module 3</a></li>
            <li><a href="/electrical/module2">Module 4</a></li>
          </ul>
        </li>
        <li>
          <strong>Computer Engineering</strong>
          <ul>
            <li><a href="/computer/module1">Module 1</a></li>
            <li><a href="/computer/module2">Module 2</a></li>
            <li><a href="/computer/module3">Module 3</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
