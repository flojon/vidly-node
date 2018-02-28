const config = require('config');
const winston = require('winston');
const mongoose = require('mongoose');

const db_url = config.get("db.url");

mongoose.connect(db_url).then(() => winston.info('Connected to MongoDB at:', db_url));
