import NavBar from "./NavBar";
import "../Styles/HomePage.css";
import React, { useState, useEffect } from "react";


export const AdminHome = () => {
  // Simulated admin-related courses (Replace this with API fetching)
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Simulated API call (Replace this with an actual API call)
    const fetchCourses = async () => {
      const response = [
        { id: 1, name: "Electrical Engineering - Module 1", path: "/admin/electrical/module1" },
        { id: 2, name: "Electrical Engineering - Module 2", path: "/admin/electrical/module2" },
        { id: 3, name: "Computer Engineering - Module 1", path: "/admin/computer/module1" },
      ];
      setCourses(response);
    };

    fetchCourses();
  }, []);

  return (
    <div style={{ textAlign: "left", padding: "20px" }}>
      <NavBar />
      <h1>Admin Dashboard</h1>
      <h2>Your Assigned Courses</h2>
      <ul>
        {courses.length > 0 ? (
          courses.map((course) => (
            <li key={course.id}>
              <a href={course.path}>{course.name}</a>
            </li>
          ))
        ) : (
          <p>No courses assigned yet.</p>
        )}
      </ul>
    </div>
  );
};