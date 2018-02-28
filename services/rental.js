const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const {Rental, Customer, Movie } = require('../models');

function validate(data) {
    const schema = {
        movie: Joi.objectId().required(),
        customer: Joi.objectId().required(),
        dateReturned: Joi.date()
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
        const {error} = validate(data);
        if (error)
            return { error: error.details[0].message };

        let customer = await Customer.findById(data.customer);
        if (!customer)
            return { error: "Invalid customer id" };

        let movie = await Movie.findById(data.movie);
        if (!movie)
            return { error: "Invalid movie id" };

        let rental = new Rental(data);
        rental = await rental.save();
        rental = await rental
                .populate('customer')
                .populate('movie').execPopulate();
        
        return { rental: rental };
    }

    async get(id) {
        return Rental.findById(id)
                    .populate('customer')
                    .populate('movie');
    }

    async update(id, data) {
        const {error} = validate(data);
        if (error)
            return { error: error.details[0].message };

        const rental = await Rental.findByIdAndUpdate(id, data, {new: true})
                                .populate('customer')
                                .populate('movie');
;
        return { rental: rental };
    }

    async delete(id) {
        return Rental.findByIdAndRemove(id)
                .populate('customer')
                .populate('movie');
    }
}

module.exports = new RentalService()
