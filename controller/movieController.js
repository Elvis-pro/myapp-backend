const Movie = require("../models/movie");

// GET all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

// POST a new movie
exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create movie' });
  }
};

//get recently added movie
exports.getRecentlyAdded = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ releaseDate: -1 }).limit(10);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get top rated movie
exports.getTopRated = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ rating: -1 }).limit(10);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get most popular movies
exports.getMostPopular = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ views: -1 }).limit(10);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get movie by slug and increase views
exports.getMovieBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Find movie by slug and increment views
    const movie = await Movie.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },  // 👈 increase views count
      { new: true }            // return updated movie
    );

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletebyId = async (req, res) =>{
  try{
    const {id} = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id)
    if (!deletedMovie){
     return res.status(404).json("movie not found")
    }

    res.status(201).json({message: "Series deleted successfully", deletedMovie })
  } catch (err){
    res.status(400).json(err.message)
  }
}
