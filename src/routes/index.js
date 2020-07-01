const express = require("express");
const courses_controller = require('../controller/courses_controller');

const router = express.Router();

const {
landing, view_all_courses, get_one_course, create_course, update_course, delete_course,
} = courses_controller;

router.get('/', landing);

// View all courses
router.get('/courses', view_all_courses);

// Get a course
router.get('/courses/:id', get_one_course);

// Create a course
router.post('/courses', create_course);

// Update a course
router.put('/courses/:id', update_course);


// Delete course request
router.delete('/courses/:id', delete_course);

module.exports = router;