import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import "../Styles/Course.css";

export const Course= () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({});
  const [caMarks, setCaMarks] = useState([]);
  const [completedTopics, setCompletedTopics] = useState({});
  const [remainingHours, setRemainingHours] = useState(0);

  useEffect(() => {
    if (courseId) {
      fetch(`http://localhost:5005/get-course/${courseId}`)
        .then((response) => response.json())
        .then((data) => {
            setCourseData(data);
          setCaMarks(Array(data[0].assessments.length).fill(""));
          const initialCompleted = {};
          data[0].topics.forEach((topic) => {
            initialCompleted[topic.id] = false;
          });
          setCompletedTopics(initialCompleted);
          setRemainingHours(data[0].topics.reduce((sum, topic) => sum + topic.hours, 0));
        })
        .catch((error) => console.error("Error fetching course data:", error));
    }
  }, [courseId]);

  const handleMarkChange = (index, value) => {
    const newMarks = [...caMarks];
    newMarks[index] = value;
    setCaMarks(newMarks);
  };

  const handleTopicToggle = (id) => {
    const newCompletedTopics = {
      ...completedTopics,
      [id]: !completedTopics[id],
    };
    setCompletedTopics(newCompletedTopics);

    const completedHours = courseData.topics
      .filter((topic) => newCompletedTopics[topic.id])
      .reduce((sum, topic) => sum + topic.hours, 0);

    setRemainingHours(courseData.topics.reduce((sum, topic) => sum + topic.hours, 0) - completedHours);
  };

  const totalCaMarks = caMarks.reduce((sum, mark) => sum + parseInt(mark || 0), 0);
  const totalAssessmentMarks = courseData.assessments?.reduce((sum, assessment) => sum + (assessment.marks || 0), 0) || 0;
  const eligibleForFinal = totalAssessmentMarks > 0 ? totalCaMarks >= 0.5 * totalAssessmentMarks : false;

  const gradeThresholds = {
    "A+": 85,
    "A": 75,
    "A-": 70,
    "B+": 65,
    "B": 60,
    "B-": 55,
    "C+": 50,
    "C": 45,
    "C-": 40,
  };

  const remainingMarks = Object.entries(gradeThresholds).map(([grade, threshold]) => {
    const requiredMarks = Math.max(0, threshold - totalCaMarks);
    const maxFinalExamMarks = 100 - courseData.assessments?.reduce((sum, assessment) => sum + assessment.marks, 0);
    if (requiredMarks >= 0.3 * maxFinalExamMarks) {
      return { grade, requiredMarks };
    }
    return null;
  }).filter(Boolean);

  return (
    <div className="course-container">
      <NavBar />
      <h1>{courseData.courseName} <span className="total-hours">Total Course Hours: {courseData.credits * 14}</span></h1>
      <h2>Contents</h2>
      <table>
        <thead>
          <tr>
            <th>Topic Name</th>
            <th>Hours</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {courseData.topics?.map((topic) => (
            <tr key={topic.id}>
              <td>{topic.name}</td>
              <td>{topic.hours}</td>
              <td>
                <input
                  type="checkbox"
                  checked={completedTopics[topic.id] || false}
                  onChange={() => handleTopicToggle(topic.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Continuous Assessments</h2>
      <table>
        <thead>
          <tr>
            <th>Assessment</th>
            <th>Marks (Out of)</th>
          </tr>
        </thead>
        <tbody>
          {courseData.assessments?.map((assessment, index) => (
            <tr key={index}>
              <td>{assessment.name}</td>
              <td>
                <input
                  type="number"
                  value={caMarks[index]}
                  onChange={(e) => handleMarkChange(index, e.target.value)}
                />
                (out of {assessment.marks})
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total CA Marks: {totalCaMarks}</h3>
      <h3>{eligibleForFinal ? "Eligible to Face Final Exam" : "Not Eligible to Face Final Exam"}</h3>
      <h3>Remaining Lecture Hours: {remainingHours}</h3>

      {eligibleForFinal && (
        <div>
          <h3>Remaining Marks Needed for Each Grade:</h3>
          <ul>
            {remainingMarks.map(({ grade, requiredMarks }) => (
              <li key={grade}>{grade}: {requiredMarks} marks</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
