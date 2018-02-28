const config = require('config');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const error = require('../middleware/error')
const winston = require('winston');

const routes = require('../routes');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use('/', routes);
app.use(error);

const port = config.get("port");
app.listen(port, () => winston.info(`Listening on port ${port}`));
