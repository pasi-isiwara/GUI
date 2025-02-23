import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

// Database connection configuration
const db = {
  host: 'bagzohmlwp71pya3e1fy-mysql.services.clever-cloud.com',  // Your database host
  user: 'utexprev7p2pq1bf',  // Your database username
  password: 'hz1NX7QILg6eDvMmaB83',  // Your database password
  database: 'bagzohmlwp71pya3e1fy'  // Your database name
};

const connection = mysql.createConnection(db);

// Connect to database
connection.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// Route to insert course data
app.post('/add-course', (req, res) => {
  const { courseName, credits, topics, assessments } = req.body;

  if (!courseName || !credits || !topics || !assessments) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Insert course into database
  const courseQuery = "INSERT INTO courses (name, credits) VALUES (?, ?)";
  connection.query(courseQuery, [courseName, credits], (err, courseResult) => {
    if (err) return res.status(500).json({ message: "Database Error", error: err });

    const courseId = courseResult.insertId; // Get the inserted course ID

    // Insert topics
    const topicValues = topics.map(topic => [courseId, topic.name, topic.hours]);
    if (topicValues.length > 0) {
      const topicQuery = "INSERT INTO topics (course_id, name, hours) VALUES ?";
      connection.query(topicQuery, [topicValues], (err) => {
        if (err) console.error("Error inserting topics:", err);
      });
    }

    // Insert assessments
    const assessmentValues = assessments.map(assessment => [courseId, assessment.name, assessment.marks]);
    if (assessmentValues.length > 0) {
      const assessmentQuery = "INSERT INTO assessments (course_id, name, marks) VALUES ?";
      connection.query(assessmentQuery, [assessmentValues], (err) => {
        if (err) console.error("Error inserting assessments:", err);
      });
    }

    res.status(200).json({ message: "Course added successfully" });
  });
});

// Start server
app.listen(5005, () => {
  console.log('Server is running on http://localhost:5005');
});
