const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const {Rental, Customer, Movie } = require('../models');

async function validate(data) {
    const schema = {
        movie: Joi.objectId().required(),
        customer: Joi.objectId().required(),
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

        let customer = await Customer.findById(data.customer);
        if (!customer)
            throw "Invalid customer id";

        let movie = await Movie.findById(data.movie);
        if (!movie)
            throw "Invalid movie id";

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
