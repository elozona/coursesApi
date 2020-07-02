const Joi = require('joi');

const courses = require('../model/courses');

exports.landing = (req, res) => {
    res.send('Welcome to my Course API!!');
};

// View all courses
exports.view_all_courses =  (req, res) => {
    return res.json(courses);
};

// Get a course
exports.get_one_course = (req, res) => {
    const course = courses.find(required_course => required_course.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    return res.send(course);
};

// Create a course
exports.create_course = (req, res) => {
    const result = validateCourse(req.body);
    if (result.error) return res.status(404).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    return res.send(course);
};

// Update a course
exports.update_course = (req, res) => {
    // Look up the course
    // If course doesn't exist, return 404
    const course = courses.find(required_course => required_course.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    // Validate course
    // If invalid, return 400 - Bad request
    const result = validateCourse(req.body);
    if (result.error) return res.status(404).send(result.error.details[0].message);

    // Update course
    course.name = req.body.name;

    // Return updated course to client
    return res.send(course);
};

// Define a schema(Input Validation)
validateCourse = (course) => {
    const schema = Joi.object().keys({
        course_name: Joi.string().min(3).max(30).required(),
        course_title: Joi.string().min(3).max(20).required(),
        course_code: Joi.number().integer().positive().min(100).max(400).required(),
        lecturer: Joi.string().required(),
        gender:  Joi.any().valid("Male", "Female").error(() => 'Gender should be Male (or) Female')
    });

    return Joi.validate(course, schema);
}

// Delete course request
exports.delete_course = (req, res) => {
    // Look up the course
    // If not existent, return 404 - Bad request
    const course = courses.find(required_course => required_course.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    // Delete the course
    const index = courses.indexOf(course); // Find the index of course
    courses.splice(index, 1);

    // Return the same course - By convention
    return res.send(course);
};
