const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');

const router = express.Router();
const service = require('../services/user');

router.get('/', async (req, res) => {
    let users = await service.getAll();
    res.send(users);
});

router.post('/', auth, async (req, res) => {
    try {
        let user = await service.create(req.body);

        // Send auth token as header
        res
            .header('X-Auth-Token', user.generateAuthToken())
            .send(_.pick(user, ['name', 'email']));
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

router.put('/:id', auth, async (req, res) => {
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

router.delete('/:id', auth, async (req, res) => {
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