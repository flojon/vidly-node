const config = require('config');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const error = require('../middleware/error')
const winston = require('winston');
const cors = require('cors');

const routes = require('../routes');

const corsOptions = {
  origin: 'https://localhost:4200',
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('tiny'));
app.use('/', routes);
app.use(error);

const port = config.get("port");
const server = app.listen(port, () => winston.info(`Listening on port ${port}`));

module.exports = server;
