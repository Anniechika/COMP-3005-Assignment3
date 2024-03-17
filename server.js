const express = require("express");
const path = require("path");
const pool = require("./db"); // Assuming you have db.js set up for PostgreSQL
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies

app.use(express.static("public"));

// Function to check if connected succefully
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error testing the database connection", err.stack);
  } else {
    console.log(
      "Database connection is successful. Current time from DB:",
      res.rows[0]["now"]
    );
  }
});

// Get all students
app.get("/students", async (req, res) => {
  console.log("triggerd");
  try {
    const { rows } = await pool.query(
      "SELECT * FROM students ORDER BY student_id;"
    );
    res.json(rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Add a student
app.post("/students", async (req, res) => {
  try {
    const { first_name, last_name, email, enrollment_date } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, $4) RETURNING *;",
      [first_name, last_name, email, enrollment_date]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a student's email
app.put("/students/:id/email", async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const { rows } = await pool.query(
      "UPDATE students SET email = $1 WHERE student_id = $2 RETURNING *;",
      [email, id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a student
app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM students WHERE student_id = $1;", [id]);
    res.json({ message: "Student deleted successfully." });
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
