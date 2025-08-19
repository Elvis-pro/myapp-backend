const express = require('express');
const router = express.Router();
const {
  getAllVisitors,
  getTodayVisitors,
  getVisitorStats,
} = require('../controller/visitorcontroller');

router.get('/', getAllVisitors);
router.get('/today', getTodayVisitors);
router.get('/stats', getVisitorStats);

module.exports = router;
