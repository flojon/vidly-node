const Joi = require('joi');
const {Movie, Genre} = require('../models');

async function validate(movie) {
    const schema = {
        title: Joi.string().min(3).required(),
        genre: {
            _id: Joi.string().length(24).required(),
            name: Joi.string()
        },
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
        await validate(data);

        let genre = await Genre.findById(data.genre._id);
        if (!genre)
            throw "Invalid genre";

        let movie = new Movie(data);
        movie.genre = {
            _id: genre._id,
            name: genre.name
        };
        return movie.save();
    }

    async get(id) {
        return Movie.findById(id);
    }

    async update(id, data) {
        await validate(data);

        let genre = await Genre.findById(data.genre._id);
        if (!genre)
            throw "Invalid genre";

        data.genre = {
            _id: genre._id,
            name: genre.name
        }

        return Movie.findByIdAndUpdate(id, data, {new: true})
    }

    async delete(id) {
        return Movie.findByIdAndRemove(id);
    }
}

module.exports = new MovieService()
