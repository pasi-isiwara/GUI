import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const PORT = 5005;

// Database connection
const db = mysql.createConnection({
  host: 'bagzohmlwp71pya3e1fy-mysql.services.clever-cloud.com',
  user: 'utexprev7p2pq1bf',
  password: 'hz1NX7QILg6eDvMmaB83',
  database: 'bagzohmlwp71pya3e1fy',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// Route to add a new course
app.post('/add-course', (req, res) => {
  const { courseName, moduleCode, credits, topics, assessments } = req.body;

  if (!courseName || !moduleCode || !credits) {
    return res.status(400).json({ message: 'Please fill all required fields.' });
  }

  const insertCourseQuery = `INSERT INTO courses (courseName, moduleCode, credits) VALUES (?, ?, ?)`;

  db.query(insertCourseQuery, [courseName, moduleCode, credits], (err, result) => {
    if (err) {
      console.error('Error inserting course:', err);
      return res.status(500).json({ message: 'Failed to add course.' });
    }

    const courseId = result.insertId; // Get inserted course ID

    // Insert topics
    if (topics.length > 0) {
      const topicValues = topics.map((t) => [courseId, t.name, t.hours]);
      const insertTopicsQuery = `INSERT INTO topics (courseId, name, hours) VALUES ?`;

      db.query(insertTopicsQuery, [topicValues], (err) => {
        if (err) console.error('Error inserting topics:', err);
      });
    }

    // Insert assessments
    if (assessments.length > 0) {
      const assessmentValues = assessments.map((a) => [courseId, a.name, a.marks]);
      const insertAssessmentsQuery = `INSERT INTO assessments (courseId, name, marks) VALUES ?`;

      db.query(insertAssessmentsQuery, [assessmentValues], (err) => {
        if (err) console.error('Error inserting assessments:', err);
      });
    }

    res.status(200).json({ message: 'Course added successfully!' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

