const Movie = require("../models/movie");
const Series = require("../models/series");

exports.findByGenre = async (req, res) => {
  try {
    const { genreName } = req.params;

    // Case-insensitive search (e.g. "Action", "action", "ACTION")
    const regex = new RegExp(genreName, "i");

    const movies = await Movie.find({ genres: { $in: [regex] } });
    const series = await Series.find({ genres: { $in: [regex] } });

    if (!movies.length && !series.length) {
      return res.status(404).json({ message: "No movies or series found for this genre" });
    }

    res.status(200).json({ movies, series });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err)
  }
};
