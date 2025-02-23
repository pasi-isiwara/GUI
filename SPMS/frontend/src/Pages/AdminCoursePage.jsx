import React, { useState } from "react";
import NavBar from "./NavBar";
import "../Styles/AdminCoursePage.css";

export const AdminCoursePage = () => {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState(""); // New state for course code
  const [credits, setCredits] = useState("");
  const [topics, setTopics] = useState([]);
  const [assessments, setAssessments] = useState([]);

  const addTopic = () => {
    setTopics([...topics, { name: "", hours: "" }]);
  };

  const addAssessment = () => {
    setAssessments([...assessments, { name: "", marks: "" }]);
  };

  const handleTopicChange = (index, field, value) => {
    const newTopics = [...topics];
    newTopics[index][field] = value;
    setTopics(newTopics);
  };

  const handleAssessmentChange = (index, field, value) => {
    const newAssessments = [...assessments];
    newAssessments[index][field] = value;
    setAssessments(newAssessments);
  };

  // Function to handle course code input
  const handleCourseCodeChange = (e) => {
    const value = e.target.value.toUpperCase(); // Convert input to uppercase
    const regex = /^[A-Z0-9_]*$/; // Only capital letters, numbers, and underscore
    if (regex.test(value)) {
      setCourseCode(value);
    }
  };

  return (
    <div className="admin-course-page">
      <NavBar />
      <h1>Admin Course Page</h1>

      <div className="course-inputs">
        <label>Course Name:</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Enter Course Name"
        />

        <label>Course Code:</label>
        <input
          type="text"
          value={courseCode}
          onChange={handleCourseCodeChange}
          placeholder="Enter Course Code (e.g., CS101)"
        />

        <label>Credits:</label>
        <input
          type="number"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          placeholder="Enter Credits"
        />
      </div>

      <div className="topics-section">
        <h2>Contents</h2>
        {topics.map((topic, index) => (
          <div key={index} className="topic-item">
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
      </div>

      <div className="assessments-section">
        <h2>Continuous Assessments</h2>
        {assessments.map((assessment, index) => (
          <div key={index} className="assessment-item">
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
      </div>
    </div>
  );
};
