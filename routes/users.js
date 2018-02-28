const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');

const router = express.Router();
const service = require('../services/user');

router.get('/me', auth, async (req, res) => {
    let user = await service.get(req.user._id);
    user = _.pick(user, ['name', 'email']);
    res.send(user);
});

router.get('/', async (req, res) => {
    let users = await service.getAll();
    res.send(users);
});

router.post('/', auth, async (req, res) => {
    const {error, user} = await service.create(req.body);
    if (error) {
        res.status(400).send(error);
    } else { 
        // Send auth token as header
        res.header('X-Auth-Token', user.generateAuthToken())
            .send(_.pick(user, ['name', 'email']));
    }
});

router.get('/:id', async (req, res) => {
    let user = await service.get(req.params.id);
    if (user) {
        res.send(user);    
    } else {
        res.status(404).send('No user found with the given id');
    }
});

router.put('/:id', auth, async (req, res) => {
    const {error, user} = await service.update(req.params.id, req.body);
    if (error) {
        res.status(400).send(error);
    } else if (user) {
        res.send(_.pick(user, ['name', 'email']));
    } else {
        res.status(404).send('No user found with the given id');
    }
});

router.delete('/:id', auth, async (req, res) => {
    let user = await service.delete(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send('No user found with the given id');
    }
});

module.exports = router;
