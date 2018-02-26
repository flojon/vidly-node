
const express = require('express');
const router = express.Router();
const service = require('../services/rental');

router.get('/', async (req, res) => {
    let rentals = await service.getAll();
    res.send(rentals);
});

router.post('/', async (req, res) => {
    try {
        let rental = await service.create(req.body);
        res.send(rental);
    }
    catch (error) {
        if (error.details && error.details[0])
            res.status(400).send(error.details[0].message);
        else
            res.status(400).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let rental = await service.get(req.params.id);
        if (rental) {
            res.send(rental);    
        } else {
            res.status(404).send('No rental found with the given id');
        }
    } catch (error) {
        res.send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        let rental = await service.update(req.params.id, req.body);
        if (rental) {
            res.send(rental);
        } else {
            res.status(404).send('No rental found with the given id');
        }
    } catch (error) {
        if (error.details && error.details[0])
            res.status(400).send(error.details[0].message);
        else
            res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let rental = await service.delete(req.params.id);
        if (rental) {
            res.send(rental);
        } else {
            res.status(404).send('No rental found with the given id');
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;