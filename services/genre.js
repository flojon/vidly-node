const Joi = require('joi');
const {Genre} = require('../models');

function validate(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

class GenreService {
    async getAll() {
        return Genre.find().sort('name');
    }

    async create(data) {
        const {error} = validate(data);
        if (error)
            return { error: error.details[0].message };
    
        let genre = new Genre(data);
        return { genre: await genre.save() };
    }

    async get(id) {
        return Genre.findById(id);
    }

    async update(id, data) {
        const {error} = validate(data);
        if (error)
            return { error: error.details[0].message };
        
        return { genre: await Genre.findByIdAndUpdate(id, data, {new: true}) };
    }

    async delete(id) {
        return Genre.findByIdAndRemove(id);
    }
}

module.exports = new GenreService()
