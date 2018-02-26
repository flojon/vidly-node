
const express = require('express');
const router = express.Router();
const service = require('../services/user');

router.get('/', async (req, res) => {
    let users = await service.getAll();
    res.send(users);
});

router.post('/', async (req, res) => {
    try {
        let user = await service.create(req.body);
        res.send(user);
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
        let user = await service.get(req.params.id);
        if (user) {
            res.send(user);    
        } else {
            res.status(404).send('No user found with the given id');
        }
    } catch (error) {
        res.send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        let user = await service.update(req.params.id, req.body);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send('No user found with the given id');
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
        let user = await service.delete(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send('No user found with the given id');
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;