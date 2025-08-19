const express = require('express');
const router = express.Router();
const movieController = require('../controller/movieController');

router.get('/', movieController.getAllMovies);
router.post('/', movieController.createMovie);

module.exports = router;
