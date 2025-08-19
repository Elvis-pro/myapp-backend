const Series = require("../models/series");

// GET all series
exports.getAllSeries = async (req, res) => {
  try {
    const seriesList = await Series.find();
    res.json(seriesList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch series' });
  }
};

// POST a new series
exports.createSeries = async (req, res) => {
  try {
    const series = new Series(req.body);
    await series.save();
    res.status(201).json(series);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create series' });
  }
};

//finding tv series by Genre
exports.findByGenre = async (req, res) => {
  try {
    const genre = req.query.name; // e.g. ?name=action

    const series = await Series.find({
      genres: { $in: [genre.toUpperCase()] } // matches array values
    });

    if (!series.length) {
      return res.status(404).json({ message: "No series found for this genre" });
    }

    res.status(200).json(series);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Adding new episodes and updating
// POST /series/:id/seasons/:seasonId/episodes
exports.addEpisode = async (req, res) => {
  try {
    const { id, seasonId } = req.params;

    const newEpisode = {
      title: req.body.title,
      episodeNumber: req.body.episodeNumber,
      url: req.body.url
    };

    const updatedSeries = await Series.findOneAndUpdate(
      { _id: id, "seasons._id": seasonId },
      { $push: { "seasons.$.episodes": newEpisode } }, // 👈 push episode
      { new: true }
    );

    if (!updatedSeries) {
      return res.status(404).json({ message: "Season not found" });
    }

    res.json(updatedSeries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params; // get id from URL

    const deletedSeries = await Series.findByIdAndDelete(id);

    if (!deletedSeries) {
      return res.status(404).json({ message: "Series not found" });
    }

    res.status(200).json({ message: "Series deleted successfully", deletedSeries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

