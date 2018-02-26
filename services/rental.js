const Joi = require('joi');
const {Rental} = require('../models');

async function validate(data) {
    const schema = {
        movie: Joi.string().length(24).required(),
        customer: Joi.string().length(24).required(),
    };

    return Joi.validate(data, schema);
}

class RentalService {
    async getAll() {
        return Rental.find()
                    .populate('customer')
                    .populate('movie')
                    .sort('-dateRented');
    }

    async create(data) {
        await validate(data);
        let rental = new Rental(data);
        rental = await rental.save();
        return rental
                .populate('customer')
                .populate('movie').execPopulate();
    }

    async get(id) {
        return Rental.findById(id)
                    .populate('customer')
                    .populate('movie');
    }

    async update(id, data) {
        await validate(data);
        return Rental.findByIdAndUpdate(id, data, {new: true})
                    .populate('customer')
                    .populate('movie');
    }

    async delete(id) {
        return Rental.findByIdAndRemove(id)
                .populate('customer')
                .populate('movie');
    }
}

module.exports = new RentalService()
