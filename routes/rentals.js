const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const service = require('../services/rental');

router.get('/', async (req, res) => {
    let rentals = await service.getAll();
    res.send(rentals);
});

router.post('/', auth, async (req, res) => {
    const {error, rental} = await service.create(req.body);
    if (error) {
        res.status(400).send(error);
    } else {
        res.send(rental);
    }
});

router.get('/:id', async (req, res) => {
    let rental = await service.get(req.params.id);
    if (rental) {
        res.send(rental);    
    } else {
        res.status(404).send('No rental found with the given id');
    }
});

router.put('/:id', auth, async (req, res) => {
    const {error, rental} = await service.update(req.params.id, req.body);
    if (error) {
        res.status(400).send(error);
    } else if (rental) {
        res.send(rental);
    } else {
        res.status(404).send('No rental found with the given id');
    }
});

router.delete('/:id', auth, async (req, res) => {
    let rental = await service.delete(req.params.id);
    if (rental) {
        res.send(rental);
    } else {
        res.status(404).send('No rental found with the given id');
    }
});

module.exports = router;
