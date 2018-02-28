require('express-async-errors');
const winston = require('winston');

winston.add(winston.transports.File, { filename: 'error.log'});

process.on('uncaughtException', (error) => {
    winston.error(error.message, error);
});

process.on('unhandledRejection', (error) => {
    winston.error(error.message, error);
});
