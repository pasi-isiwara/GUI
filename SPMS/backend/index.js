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

// Route to get course data
app.get('/get-course/:courseId', (req, res) => {
  const { courseId } = req.params;
  
  const query = `
    SELECT c.id AS courseId, c.courseName, c.moduleCode, c.credits, 
           t.id AS topicId, t.name AS topicName, t.hours,
           a.id AS assessmentId, a.name AS assessmentName, a.marks
    FROM courses c
    LEFT JOIN topics t ON c.id = t.courseId
    LEFT JOIN assessments a ON c.id = a.courseId
    WHERE c.id = ?
    ORDER BY t.id, a.id;
  `;

  db.query(query, [courseId], (err, results) => {
    if (err) {
      console.error("Error fetching course data:", err);
      return res.status(500).json({ message: "Failed to fetch course data." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Course not found." });
    }

    const courseData = {
      courseName: results[0].courseName,
      moduleCode: results[0].moduleCode,
      credits: results[0].credits,
      topics: [],
      assessments: [],
    };

    results.forEach((row) => {
      if (row.topicId && !courseData.topics.some(t => t.id === row.topicId)) {
        courseData.topics.push({ id: row.topicId, name: row.topicName, hours: row.hours });
      }

      if (row.assessmentId && !courseData.assessments.some(a => a.name === row.assessmentName)) {
        courseData.assessments.push({ name: row.assessmentName, marks: row.marks });
      }
    });

    res.status(200).json(courseData);
  });
});

app.put("/update-course/:id", (req, res) => {
  const { id } = req.params;
  const { courseName, moduleCode, credits, topics, assessments } = req.body;

  // Update course data
  const updateCourseQuery = `
    UPDATE courses 
    SET courseName = ?, moduleCode = ?, credits = ?
    WHERE id = ?
  `;

  db.query(updateCourseQuery, [courseName, moduleCode, credits, id], (err) => {
    if (err) {
      console.error("Error updating course:", err);
      return res.status(500).json({ message: "Failed to update course." });
    }

    // Delete existing topics and assessments to avoid duplicates
    const deleteTopicsQuery = `DELETE FROM topics WHERE courseId = ?`;
    db.query(deleteTopicsQuery, [id], (err) => {
      if (err) console.error("Error deleting topics:", err);

      // Insert updated topics
      if (topics.length > 0) {
        const topicValues = topics.map((t) => [id, t.name, t.hours]);
        const insertTopicsQuery = `INSERT INTO topics (courseId, name, hours) VALUES ?`;
        db.query(insertTopicsQuery, [topicValues], (err) => {
          if (err) console.error("Error inserting topics:", err);
        });
      }
    });

    const deleteAssessmentsQuery = `DELETE FROM assessments WHERE courseId = ?`;
    db.query(deleteAssessmentsQuery, [id], (err) => {
      if (err) console.error("Error deleting assessments:", err);

      // Insert updated assessments
      if (assessments.length > 0) {
        const assessmentValues = assessments.map((a) => [id, a.name, a.marks]);
        const insertAssessmentsQuery = `INSERT INTO assessments (courseId, name, marks) VALUES ?`;
        db.query(insertAssessmentsQuery, [assessmentValues], (err) => {
          if (err) console.error("Error inserting assessments:", err);
        });
      }
    });

    res.status(200).json({ message: "Course updated successfully!" });
  });
});


// Route to get all course modules
app.get('/get-courses', (req, res) => {
  const query = `SELECT id, courseName, moduleCode FROM courses`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching courses:", err);
      return res.status(500).json({ message: "Failed to fetch courses." });
    }
    res.status(200).json(results);
  });
});
