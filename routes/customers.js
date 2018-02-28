const auth = require('../middleware/auth');
const express = require('express');
const service = require('../services/customer');

const router = express.Router();

router.get('/', async (req, res) => {
    let customers = await service.getAll();
    res.send(customers);
});

router.post('/', auth, async (req, res) => {
    let {error, customer} = await service.create(req.body);
    if (error)
        res.status(400).send(error);
    else
        res.send(customer);
});

router.get('/:id', async (req, res) => {
    let customer = await service.get(req.params.id);
    if (customer) {
        res.send(customer);
    } else {
        res.status(404).send('No customer found with the given id');
    }
});

router.put('/:id', auth, async (req, res) => {
    let {error, customer} = await service.update(req.params.id, req.body);
    if (error) {
        res.status(400).send(error);
    } else if (customer) {
        res.send(customer);
    } else {
        res.status(404).send('No customer found with the given id');
    }
});

router.delete('/:id', auth, async (req, res) => {
    let customer = await service.delete(req.params.id);
    if (customer) {
        res.send(customer);
    } else {
        res.status(404).send('No customer found with the given id');
    }
});

module.exports = router;
