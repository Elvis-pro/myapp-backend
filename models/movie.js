const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  releaseYear: Number,
  image: String,
  slug: { type: String, unique: true },
  genres: [{ type: String, required: true }], // 👈 multiple genres supported
});

module.exports = mongoose.model('Movie', movieSchema);
