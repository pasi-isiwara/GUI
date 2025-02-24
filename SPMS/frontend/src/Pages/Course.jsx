import React, { useState } from "react";
import NavBar from "./NavBar";
import "../Styles/Course.css";

export const Course = () => {
  const moduleName = "Example Module";
  const totalHours = 100; // Example total hours
  const contents = [
    { name: "Topic 1", completed: true },
    { name: "Topic 2", completed: false },
    { name: "Topic 3", completed: false },
    { name: "Topic 4", completed: true },
  ];
  
  const [caMarks, setCaMarks] = useState([30, 20, 35, 25]); // Example CA marks
  const totalCaMarks = caMarks.reduce((sum, mark) => sum + mark, 0);
  const eligibleForFinal = totalCaMarks >= 30;
  const moreMarksNeeded = Math.max(0, 40 - totalCaMarks); // Marks needed to pass
  
  const calculateGrade = (finalMarks) => {
    if (finalMarks >= 85) return "A+";
    if (finalMarks >= 75) return "A";
    if (finalMarks >= 70) return "A-";
    if (finalMarks >= 65) return "B+";
    if (finalMarks >= 60) return "B";
    if (finalMarks >= 55) return "B-";
    if (finalMarks >= 50) return "C+";
    if (finalMarks >= 45) return "C";
    if (finalMarks >= 40) return "C-";
    return "F";
  };

  return (
    <div className="course-container">
      <NavBar />
      <h1>{moduleName} <span className="total-hours">Total Hours: {totalHours}</span></h1>
      
      <h2>Contents</h2>
      <ul>
        {contents.map((content, index) => (
          <li key={index}>
            {content.name} 
            <input type="checkbox" checked={content.completed} readOnly />
          </li>
        ))}
      </ul>
      
      <h3>Completed: {((contents.filter(c => c.completed).length / contents.length) * 100).toFixed(2)}%</h3>

      <h2>Continuous Assessments</h2>
      {caMarks.map((mark, index) => (
        <p key={index}>CA-{index + 1} Marks: {mark} / 40</p>
      ))}

      <h2>Total CA Marks = {totalCaMarks}</h2>
      <p>{eligibleForFinal ? "✅ Eligible for Final Exam" : "❌ Not Eligible for Final Exam"}</p>

      <h2>Required More Marks</h2>
      <p>Marks Needed to Pass: {moreMarksNeeded}</p>

      <h2>Final Grade</h2>
      <p>Your Grade: {calculateGrade(totalCaMarks + moreMarksNeeded)}</p>
    </div>
  );
};
