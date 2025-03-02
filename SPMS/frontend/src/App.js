import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { Course } from './Pages/Course';
import { AllCourses } from './Pages/AllCourses';
import { AdminHome } from './Pages/AdminHome';
import { AdminCoursePage } from './Pages/AdminCoursePage';
import { AdminCourseView } from './Pages/AdminCourseView';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/course" element={<Course />} />
          <Route path="/all-courses" element={<AllCourses />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admincourse" element={<AdminCoursePage />} />
          <Route path="/admincourseview" element={<AdminCourseView />} />
          <Route path="/admincourseview/:courseId" element={<AdminCourseView />} />
          
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
