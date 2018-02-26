const Joi = require('joi');
const {User} = require('../models');
const _ = require('lodash');
const bcrypt = require('bcrypt');

async function validate(data) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(5).required()
    };

    return Joi.validate(data, schema);
}

class UserService {
    async getAll() {
        return User.find().sort('name');
    }

    async create(data) {
        await validate(data);
        let user = new User(data);
        let salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash('qwerty', salt);
    
        await user.save();

        return _.pick(user, ['name', 'email']);
    }

    async get(id) {
        return User.findById(id);
    }

    async update(id, data) {
        await validate(data);
        return User.findByIdAndUpdate(id, data, {new: true})
    }

    async delete(id) {
        return User.findByIdAndRemove(id);
    }
}

module.exports = new UserService()
