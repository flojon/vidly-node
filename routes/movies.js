const auth = require('../middleware/auth');
const express = require('express');
const service = require('../services/movie');

const router = express.Router();

router.get('/', async (req, res) => {
    let movies = await service.getAll();
    res.send(movies);
});

router.post('/', auth, async (req, res) => {
    try {
        let movie = await service.create(req.body);
        res.send(movie);
    } catch (error) {
        if (error.details && error.details[0])
            res.status(400).send(error.details[0].message);
        else
            res.status(400).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let movie = await service.get(req.params.id);
        if (movie) {
            res.send(movie);
        } else {
            res.status(404).send('No movie found with the given id');
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        let movie = await service.update(req.params.id, req.body);
        if (movie) {
            res.send(movie);
        } else {
            res.status(404).send('No movie found with the given id');
        }
    } catch (error) {
        if (error.details && error.details[0])
            res.status(400).send(error.details[0].message);
        else
            res.status(400).send(error);
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