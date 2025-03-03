import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "../Styles/AdminCoursePage.css";

export const UpdateCourseInfo = ({ courseId }) => {
  const [courseName, setCourseName] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [credits, setCredits] = useState("");
  const [topics, setTopics] = useState([]);
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    // Fetch existing course data
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`http://localhost:5005/course/${courseId}`);
        const data = await response.json();
        setCourseName(data.courseName);
        setModuleCode(data.moduleCode);
        setCredits(data.credits);
        setTopics(data.topics);
        setAssessments(data.assessments);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [courseId]);

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

  const addTopic = () => {
    setTopics([...topics, { name: "", hours: "" }]);
  };

  const addAssessment = () => {
    setAssessments([...assessments, { name: "", marks: "" }]);
  };

  const submitUpdatedCourse = async () => {
    const updatedCourseData = {
      courseName,
      moduleCode,
      credits,
      topics,
      assessments,
    };

    try {
      const response = await fetch(`http://localhost:5005/update-course/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCourseData),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="container">
      <h1>Update Course</h1>
      <div className="input-container">
        <label>Course Name:</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label>Module Code:</label>
        <input
          type="text"
          value={moduleCode}
          onChange={(e) => setModuleCode(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label>Credits:</label>
        <input
          type="number"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
        />
      </div>

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

      <button onClick={submitUpdatedCourse} className="submit-button">
        Update Course
      </button>
    </div>
  );
};
