const express = require('express');

const router = express.Router();

// Routes
const customers = require('./customers');
const genres = require('./genres');
const movies = require('./movies');

router.use('/api/customers', customers);
router.use('/api/genres', genres);
router.use('/api/movies', movies);

module.exports = router;