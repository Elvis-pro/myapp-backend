const Visitor = require('../models/visitor');

// Get all visitor logs
exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ timestamp: -1 });
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
};

// Get today’s visitors
exports.getTodayVisitors = async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  try {
    const visitors = await Visitor.find({ timestamp: { $gte: start } });
    res.json(visitors);
  } catch (err) {res.status(500).json(err)}
}

exports.getVisitorStats = async (req, res) => {
  try {
    const total = await Visitor.countDocuments();

    const last7Days = await Visitor.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 7 },
    ]);

    const topPaths = await Visitor.aggregate([
      {
        $group: {
          _id: '$path',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json({ total, last7Days, topPaths });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

