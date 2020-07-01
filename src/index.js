const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes')
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

// Body Parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/', routes)

app.use('*', (req, res) => {
    res.status(404).json({
        message: "This path does not exist, we can build it on request"
    })
});

// Asssign a dynamic port with an environment variable PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server now listening on port ${port}...`));
