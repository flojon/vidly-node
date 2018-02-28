const auth = require('../middleware/auth');
const express = require('express');
const service = require('../services/movie');

const router = express.Router();

router.get('/', async (req, res) => {
    let movies = await service.getAll();
    res.send(movies);
});

router.post('/', auth, async (req, res) => {
    const {error, movie} = await service.create(req.body);
    if (error) {
        res.status(400).send(error);
    } else {
        res.send(movie);
    }
});

router.get('/:id', async (req, res) => {
    let movie = await service.get(req.params.id);
    if (movie) {
        res.send(movie);
    } else {
        res.status(404).send('No movie found with the given id');
    }
});

router.put('/:id', auth, async (req, res) => {
    const {error, movie} = await service.update(req.params.id, req.body);
    if (error) {
        res.status(400).send(error);
    } else if (movie) {
        res.send(movie);
    } else {
        res.status(404).send('No movie found with the given id');
    }
});

router.delete('/:id', auth, async (req, res) => {
    let movie = await service.delete(req.params.id);
    if (movie) {
        res.send(movie);
    } else {
        res.status(404).send('No movie found with the given id');
    }
});

module.exports = router;
