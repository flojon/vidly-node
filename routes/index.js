const express = require('express');

const router = express.Router();

// Routes
const customers = require('./customers');
const genres = require('./genres');
const movies = require('./movies');
const rentals = require('./rentals');
const users = require('./users');

router.use('/api/customers', customers);
router.use('/api/genres', genres);
router.use('/api/movies', movies);
router.use('/api/rentals', rentals);
router.use('/api/users', users);

module.exports = router;
