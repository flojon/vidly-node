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

const Rental = mongoose.model('Rental', new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    dateRented: { type: Date, required: true, default: Date.now },
    dateReturned: { type: Date },
    fee: { type: Number, min: 0 }
}));

const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

exports.Customer = Customer;
exports.Genre = Genre;
exports.Movie = Movie;
exports.Rental = Rental;
exports.User = User;
