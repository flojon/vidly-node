const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    isGold:  { type: Boolean, default: false }
}));

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const Genre = mongoose.model('Genre', genreSchema);

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: genreSchema, required: true },
    numberInStock:  { type: Number, default: 0, min:0, max: 255 },
    dailyRentalRate: { type: Number, default: 0, min: 0, max: 255 }
}));

exports.Customer = Customer;
exports.Genre = Genre;
exports.Movie = Movie;