import React, { useState } from "react";
import NavBar from "./NavBar";
import "../Styles/AdminCoursePage.css";

export const AdminCoursePage = () => {
  const [courseName, setCourseName] = useState("");
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

  return (
    <div style={{ textAlign: "left", padding: "20px" }}>
      <NavBar />
      <h1>Admin Course Page</h1>

      {/* Course Name and Credits */}
      <label>Course Name:</label>
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        placeholder="Enter Course Name"
      />
      <label>Credits:</label>
      <input
        type="number"
        value={credits}
        onChange={(e) => setCredits(e.target.value)}
        placeholder="Enter Credits"
      />

      {/* Topics Section */}
      <h2>Contents</h2>
      {topics.map((topic, index) => (
        <div key={index}>
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
      <h2>Continuous Assessments</h2>
      {assessments.map((assessment, index) => (
        <div key={index}>
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
  );
};
