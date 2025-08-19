const express = require('express');
const router = express.Router();
const seriesController = require('../controller/seriesController');

router.get('/', seriesController.getAllSeries);
router.get('/genre', seriesController.findByGenre);
router.post('/', seriesController.createSeries);
router.post('/series/:id/seasons/:seasonId/episodes', seriesController.addEpisode);
router.delete('/delete/:id', seriesController.deleteById)

module.exports = router;
