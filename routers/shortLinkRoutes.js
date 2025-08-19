// routes/shortlinkRoutes.js
const express = require('express');
const router = express.Router();
const { createShortLink, redirectToFullUrl } = require('../controller/shortlinkController');

router.post('/generate', createShortLink);
router.get('/s/:slug', redirectToFullUrl);

module.exports = router;
