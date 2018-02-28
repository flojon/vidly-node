const Joi = require('joi');
const {Movie, Genre} = require('../models');

function validate(movie) {
    const schema = {
        title: Joi.string().min(3).required(),
        genre: Joi.objectId().required(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number()
    };

    return Joi.validate(movie, schema);
}

class MovieService {
    async getAll() {
        return Movie.find().sort('name');
    }

    async create(data) {
        const {error} = validate(data);
        if (error)
            return { error: error.details[0].message };

        let genre = await Genre.findById(data.genre);
        if (!genre)
            throw "Invalid genre";

        let movie = new Movie(data);
        movie.genre = {
            _id: genre._id,
            name: genre.name
        };

        return { movie: await movie.save() };
    }

    async get(id) {
        return Movie.findById(id);
    }

    async update(id, data) {
        const {error} = validate(data);
        if (error)
            return { error: error.details[0].message };

        let genre = await Genre.findById(data.genre);
        if (!genre)
            throw "Invalid genre";

        data.genre = {
            _id: genre._id,
            name: genre.name
        }

        return { movie: await Movie.findByIdAndUpdate(id, data, {new: true}) };
    }

    async delete(id) {
        return Movie.findByIdAndRemove(id);
    }
}

module.exports = new MovieService()
