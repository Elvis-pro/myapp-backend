const express = require('express');
const router = express.Router();
const movieController = require('../controller/movieController');

router.get('/', movieController.getAllMovies);
router.post('/', movieController.createMovie);
router.get("/gettoprated", movieController.getTopRated)
router.get("/getRecentlyAdded", movieController.getRecentlyAdded)
router.get("/getMostPopular", movieController.getMostPopular)
router.get("/getMovieBySlug/:slug", movieController.getMovieBySlug)
router.delete("/deleteById/:id", movieController.deletebyId)

module.exports = router;
