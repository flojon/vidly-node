const Joi = require('joi');
const {User} = require('../models');
const bcrypt = require('bcrypt');

function validate(data) {
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
        const {error} = validate(data);
        if (error)
            return { error: error.details[0].message };

        let user = new User(data);
        let salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash('qwerty', salt);
    
        return { user: await user.save() };
    }

    async get(id) {
        return User.findById(id);
    }

    async update(id, data) {
        const {error} = validate(data);
        if (error)
            return { error: error.details[0].message };

        return { user: await User.findByIdAndUpdate(id, data, {new: true}) };
    }

    async delete(id) {
        return User.findByIdAndRemove(id);
    }
}

module.exports = new UserService()
