const config = require('config');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Routes
const customers = require('./routes/customers');
const genres = require('./routes/genres');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/api/customers', customers);
app.use('/api/genres', genres);

async function run() {
    const port = config.get("port");
    const db_url = config.get("db.url");

    await mongoose.connect(db_url);
    console.log('Connected to MongoDB at:', db_url);

    await app.listen(port);
    console.log(`Listening on port ${port}`);
} 

run();