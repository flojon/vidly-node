const Joi = require('joi');
const {Customer} = require('../models');

async function validate(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(3).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, schema);
}

class CustomerService {
    async getAll() {
        return Customer.find().sort('name');
    }

    async create(data) {
        await validate(data);
        let customer = new Customer(data);
        return customer.save();
    }

    async get(id) {
        return Customer.findById(id);
    }

    async update(id, data) {
        await validate(data);
        return Customer.findByIdAndUpdate(id, data, {new: true})
    }

    async delete(id) {
        return Customer.findByIdAndRemove(id);
    }
}

module.exports = new CustomerService()
