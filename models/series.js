const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  seasons: [
    {
      seasonNumber: Number,
      episodes: [
        {
          title: String,
          episodeNumber: Number,
          url: String,
        },
      ],
    },
  ],
  image: String,
  slug: { type: String, unique: true },
  genres: [{ type: String, required: true }], // 👈 same here
  releaseDate: { type: Date, default: Date.now }, // 👈 for "Recently Added"
  rating: { type: Number, default: 0 },           // 👈 for "Top Rated"
  views: { type: Number, default: 0 },            // 👈 for "Most Popular"
});

module.exports = mongoose.model('Series', seriesSchema);

