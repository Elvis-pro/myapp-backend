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
});

module.exports = mongoose.model('Series', seriesSchema);

