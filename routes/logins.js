
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

function validate(genre) {
    const schema = {
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(5).required()
    };

    return Joi.validate(genre, schema);
}

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Invalid email or password');

    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send('Invalid email or password');

    let token = jwt.sign({ _id: user._id }, 'qwerty'); // TODO extract private key
    
    res.send(token);
});

module.exports = router;