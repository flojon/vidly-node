const express = require('express');

const router = express.Router();

// Routes
const customers = require('./customers');
const genres = require('./genres');
const movies = require('./movies');
const rentals = require('./rentals');

router.use('/api/customers', customers);
router.use('/api/genres', genres);
router.use('/api/movies', movies);
router.use('/api/rentals', rentals);

module.exports = router;
