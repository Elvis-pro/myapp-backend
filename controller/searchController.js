const Movie = require("../models/movie");
const Series = require("../models/series");

exports.searchContent = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "No search query provided" });
    }

    // search both collections
    const movies = await Movie.find({ title: { $regex: query, $options: "i" } });
    const series = await Series.find({ title: { $regex: query, $options: "i" } });

    if (movies.length === 0 && series.length === 0) {
      return res.status(404).json({ msg: "No movies or series found" });
    }

    // merge into one array
    const results = [...movies, ...series];

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
