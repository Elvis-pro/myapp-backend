const express = require("express");
const router = express.Router();
const genreController = require("../controller/genreController");
 
router.get("/Genre/:Genre", genreController.findByGenre)

module.exports = router