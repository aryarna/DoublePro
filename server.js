const express = require('express');

const dotenv = require("dotenv").config();
const db = require("./config/dbConnectionConfig");
const bodyParser = require('body-parser');
const formRoutes = require('./routes/formRoutes');

const app = express();
const PORT = process.env.PORT ;


db();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// Serve static files from the "public" directory
app.use(express.static('public'));

// Routes
app.use('/api', formRoutes);





// Start server
app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
});

