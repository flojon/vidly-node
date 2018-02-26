const express = require('express');

const router = express.Router();

// Routes
const customers = require('./customers');
const genres = require('./genres');

router.use('/api/customers', customers);
router.use('/api/genres', genres);

module.exports = router;