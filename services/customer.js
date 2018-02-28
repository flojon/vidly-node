const Joi = require('joi');
const {Customer} = require('../models');

function validate(customer) {
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
        const {error} = validate(data);
        if (error)
            return { error: error.details[0].message };

        let customer = new Customer(data);
        return { customer: await customer.save() };
    }

    async get(id) {
        return Customer.findById(id);
    }

    async update(id, data) {
        const {error} = validate(data);
        if (error)
            return { error: error.details[0].message };

        return { customer: await Customer.findByIdAndUpdate(id, data, {new: true}) };
    }

    async delete(id) {
        return Customer.findByIdAndRemove(id);
    }
}

module.exports = new CustomerService()
