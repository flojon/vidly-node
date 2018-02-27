require('express-async-errors');
const winston = require('winston');
const config = require('config');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const error = require('./middleware/error')

winston.add(winston.transports.File, { filename: 'error.log'});

const routes = require('./routes');

if (!config.get('jwtPrivateKey')) {
    console.error("ERROR: Missing JWT_PRIVATE_KEY!");
    process.exit(1);
}

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/', routes);

app.use(error);

async function run() {
    const port = config.get("port");
    const db_url = config.get("db.url");

    await mongoose.connect(db_url);
    console.log('Connected to MongoDB at:', db_url);

    await app.listen(port);
    console.log(`Listening on port ${port}`);
} 

run();