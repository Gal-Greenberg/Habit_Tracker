const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors')

dotenv.config();

const port = process.env.PORT || 3000;
const app = express()
const apiRouter = express.Router()

const connectDB = require('./config/db');
connectDB();

app.use(cors())
app.use(express.json())

// add api sub route
app.use('/api', apiRouter)
require('./routes')(apiRouter)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
    console.log("Received request at /");
    res.send('Hello World from Express!!!!!!!!!!');
});
