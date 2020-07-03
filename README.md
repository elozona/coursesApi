# Introduction

This course API is an application used to store and manage university courses.

- This application should be able to read, create, update and delete courses.

# Tech Stack Used

- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Body Parser](https://www.npmjs.com/package/body-parser)
- [Joi](https://www.npmjs.com/package/joi)

# Application Features

- User can add a course
- User can update a course
- User can get all courses
- User can get a single course
- User can delete a course

# How To Use

To clone and run this application, you'll need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) (which comes with [npm](https://www.npmjs.com/)) installed on your computer.  
From your command line:

```
# Clone this repository
$ git clone https://github.com/Elozona/coursesApi.git

# Go into the repository
$ cd CoursesAPI

# Install dependencies
$ npm install

# Create .env file for environmental variables in your root directory like the .env.example file


# Run the app
$ npm run dev

```

# API Endpoints

```
GET Request -> localhost:3000/api/v1/courses
GET Request -> localhost:3000/api/v1/courses/:id
POST Request -> localhost:3000/api/v1/courses
POST Request -> localhost:3000/api/v1/courses/:id
DELETE Request -> localhost:3000/api/v1/courses/:id

```

# Author

Chinedu Ezeifeka

# License

ISC
