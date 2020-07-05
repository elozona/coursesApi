const courses = require('../model/courses');
const Joi = require('joi');

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
    if (!course) return res.status(404).json({ Error:`The course with ID number ${req.params.id} was not found.`});
    return res.json(course);
};

// Create a course
exports.create_course = (req, res) => {
    const result = validateCourse(req.body);
    if (result.error) return res.status(404).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        course_name: req.body.course_name,
        course_title: req.body.course_title,
        course_code: req.body.course_code,
        lecturer: req.body.lecturer,
        gender: req.body.gender
    };
    courses.push(course);
    return res.send(`Course added successfully with ID number ${courses.length + 1}`);
};

// Update a course
exports.update_course = (req, res) => {
    // Look up the course
    // If course doesn't exist, return 404
    const course = courses.find(required_course => required_course.id === parseInt(req.params.id));
    if (!course) return res.status(404).json({ Error:`The course with ID number ${req.params.id} was not found.`});

    // Validate course
    // If invalid, return 400 - Bad request
    const result = validateCourse(req.body);
    if (result.error) return res.status(404).send(result.error.details[0].message);

    // Update course
    updatedCourse = req.body;

    courses.forEach(course => {
        if (course.id === parseInt(req.params.id)) {
            course.course_name = updatedCourse.course_name ? updatedCourse.course_name : course.course_name;
            course.course_title = updatedCourse.course_title ? updatedCourse.course_title : course.course_title;
            course.course_code = updatedCourse.course_code ? updatedCourse.course_code : course.course_code;
            course.lecturer = updatedCourse.lecturer ? updatedCourse.lecturer : course.lecturer;
            course.gender = updatedCourse.gender ? updatedCourse.gender : course.gender;

            res.json({ course, Message: 'Course updated successfully!'});
        }
    });

    // Return updated course to client
    return res.send(course);
};

// Delete course request
exports.delete_course = (req, res) => {
    // Look up the course
    // If not existent, return 404 - Bad request
    const course = courses.find(required_course => required_course.id === parseInt(req.params.id));
    if (!course) return res.status(404).json({ Error:`The course with ID number ${req.params.id} was not found.`});

    // Delete the course
    const index = courses.indexOf(course); // Find the index of course
    courses.splice(index, 1);

    // Return the same course - By convention
    return res.json({ course, Message: 'Course deleted successfully!' });
};

// Define a schema(Input Validation)
validateCourse = (course) => {
    const schema = Joi.object().keys({
        course_name: Joi.string().min(3).max(20).required(),
        course_title: Joi.string().min(3).max(50).required(),
        course_code: Joi.number().integer().positive().min(100).max(400).required(),
        lecturer: Joi.string().min(3).max(20).required(),
        gender:  Joi.any().valid("Male", "Female").error(() => 'Gender should be Male (or) Female')
    });

    return Joi.validate(course, schema);
};