import React, { useEffect, useState } from 'react';
import NavBar from "./NavBar";
import "../Styles/HomePage.css";
import axios from 'axios';

export const HomePage = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5005/get-courses") // Backend URL
      .then((response) => {
        setModules(response.data);
      })
      .catch((error) => {
        console.error("Error fetching modules:", error);
      });
  }, []);

  return (
    <div style={{ textAlign: "left", padding: "20px" }}>
      <NavBar />
      <h1>Welcome User</h1>
      <h2>Course Categories</h2>
      <ul>
        <li>
          <strong>Comp Engineering</strong>
          <ul>
            {modules.map((module) => (
              <li key={module.id}>
                <a href={`/admincourseview/${module.id}`}>
                  {module.courseName} - {module.moduleCode}
                </a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};
