
const app = require('./controller/courses_route');

// Asssign a dynamic port with an environment variable PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server now listening on port ${port}...`));
