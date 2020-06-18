const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = require('../model/courses');

app.get('/', (req, res) => {
    res.send('Welcome to Vidly!!');
});

// View all courses
app.get('/api/courses', (req, res) => {
    res.json(courses);
});

// Create a course
app.post('/api/courses', (req, res) => {
    const result = validateCourse(req.body);
    if (result.error) return res.status(404).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

// HTTP Update request
app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If course doesn't exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    // Validate course
    // If invalid, return 400 - Bad request
    const result = validateCourse(req.body);
    if (result.error) return res.status(404).send(result.error.details[0].message);

    // Update course
    course.name = req.body.name;

    // Return updated course to client
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

// Delete request
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existent, return 404 - Bad request
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    // Delete the course
    const index = courses.indexOf(course); // Find the index of course
    courses.splice(index, 1);

    // Return the same course - By convention
    res.send(course);
})


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});


module.exports = app;