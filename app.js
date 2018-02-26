const config = require('config');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/', routes);

async function run() {
    const port = config.get("port");
    const db_url = config.get("db.url");

    await mongoose.connect(db_url);
    console.log('Connected to MongoDB at:', db_url);

    await app.listen(port);
    console.log(`Listening on port ${port}`);
} 

run();