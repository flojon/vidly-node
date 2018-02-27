const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const service = require('../services/genre');

router.get('/', async (req, res) => {
    let genres = await service.getAll();
    res.send(genres);
});

router.post('/', auth, async (req, res) => {
    let genre = await service.create(req.body);
    res.send(genre);
});

router.get('/:id', async (req, res) => {
    let genre = await service.get(req.params.id);
    if (genre) {
        res.send(genre);    
    } else {
        res.status(404).send('No genre found with the given id');
    }
});

router.put('/:id', auth, async (req, res) => {
    let genre = await service.update(req.params.id, req.body);
    if (genre) {
        res.send(genre);
    } else {
        res.status(404).send('No genre found with the given id');
    }
});

router.delete('/:id', [auth, admin], async (req, res) => {
   let genre = await service.delete(req.params.id);
    if (genre) {
        res.send(genre);
    } else {
        res.status(404).send('No genre found with the given id');
    }
});

module.exports = router;
