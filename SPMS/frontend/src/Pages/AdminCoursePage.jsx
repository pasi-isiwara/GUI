import React, { useState } from "react";
import NavBar from "./NavBar";
import "../Styles/AdminCoursePage.css";

export const AdminCoursePage = () => {
  const [courseName, setCourseName] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [credits, setCredits] = useState("");
  const [topics, setTopics] = useState([]);
  const [assessments, setAssessments] = useState([]);

  // Add a new topic
  const addTopic = () => {
    setTopics([...topics, { name: "", hours: "" }]);
  };

  // Add a new assessment
  const addAssessment = () => {
    setAssessments([...assessments, { name: "", marks: "" }]);
  };

  // Handle topic input change
  const handleTopicChange = (index, field, value) => {
    const newTopics = [...topics];
    newTopics[index][field] = value;
    setTopics(newTopics);
  };

  // Handle assessment input change
  const handleAssessmentChange = (index, field, value) => {
    const newAssessments = [...assessments];
    newAssessments[index][field] = value;
    setAssessments(newAssessments);
  };

  // Validate module code input
  const handleModuleCodeChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, "");
    setModuleCode(value);
  };

  // Submit course data to backend
  const submitCourse = async () => {
    const courseData = {
      courseName,
      moduleCode,
      credits,
      topics,
      assessments,
    };

    try {
      const response = await fetch("http://localhost:5005/add-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();
      alert(data.message);
      // Reset form after submission
      setCourseName("");
      setModuleCode("");
      setCredits("");
      setTopics([]);
      setAssessments([]);
    } catch (error) {
      console.error("Error submitting course:", error);
    }
  };

  return (
    <div className="container">
      
      <h1>Enter the New Module</h1>

      {/* Course Name, Module Code, and Credits */}
      <div className="input-container">
        <label>Course Name:</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Enter Course Name"
        />
      </div>

      <div className="input-container">
        <label>Module Code:</label>
        <input
          type="text"
          value={moduleCode}
          onChange={handleModuleCodeChange}
          placeholder="Enter Module Code (e.g., MATH_101)"
        />
      </div>

      <div className="input-container">
        <label>Credits:</label>
        <input
          type="number"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          placeholder="Enter Credits"
        />
      </div>

      {/* Topics Section */}
      <h2>Contents</h2>
      {topics.map((topic, index) => (
        <div key={index} className="topic-container">
          <input
            type="text"
            value={topic.name}
            onChange={(e) => handleTopicChange(index, "name", e.target.value)}
            placeholder="Topic Name"
          />
          <input
            type="number"
            value={topic.hours}
            onChange={(e) => handleTopicChange(index, "hours", e.target.value)}
            placeholder="Hours to Complete"
          />
        </div>
      ))}
      <button onClick={addTopic}>+ Add Topic</button>

      {/* Assessments Section */}
      <p></p>
      <h2>Continuous Assessments</h2>
      {assessments.map((assessment, index) => (
        <div key={index} className="assessment-container">
          <input
            type="text"
            value={assessment.name}
            onChange={(e) => handleAssessmentChange(index, "name", e.target.value)}
            placeholder="Assessment Name"
          />
          <input
            type="number"
            value={assessment.marks}
            onChange={(e) => handleAssessmentChange(index, "marks", e.target.value)}
            placeholder="Marks Allocated"
          />
        </div>
      ))}
      <button onClick={addAssessment}>+ Add Assessment</button>

      {/* Submit Button */}
      <button onClick={submitCourse} className="submit-button">
        Submit Course
      </button>
    </div>
  );
};