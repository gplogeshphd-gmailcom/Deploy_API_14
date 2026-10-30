
const express = require('express');

const app = express();

app.use(express.json());

// Sample student data
let students = [
    { id: 1, name: "John", course: "BCA" },
    { id: 2, name: "Alice", course: "BBA" },
    { id: 3, name: "David", course: "BCA" }
];

// Home API
app.get('/', (req, res) => {
    res.send("Backend API is running successfully");
});

// GET all students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(
        s => s.id === parseInt(req.params.id)
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// POST new student
app.post('/students', (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        course: req.body.course
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// Server port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
