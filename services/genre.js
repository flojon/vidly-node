const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: { type: String, required: true }
}));

async function validate(genre) {
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
        await validate(data);
        let genre = new Genre(data);
        return genre.save();
    }

    async get(id) {
        return Genre.findById(id);
    }

    async update(id, data) {
        await validate(data);
        return Genre.findByIdAndUpdate(id, data, {new: true})
    }

    async delete(id) {
        return Genre.findByIdAndRemove(id);
    }
}

module.exports = new GenreService()
