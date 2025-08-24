const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  releaseYear: Number,
  image: String,
  slug: { type: String, unique: true },
  genres: [{ type: String, required: true }], // 👈 multiple genres supported
  releaseDate: { type: Date, default: Date.now }, // 👈 for "Recently Added"
  rating: { type: Number, default: 0 },           // 👈 for "Top Rated"
  views: { type: Number, default: 0 },            // 👈 for "Most Popular"
});

module.exports = mongoose.model('Movie', movieSchema);
