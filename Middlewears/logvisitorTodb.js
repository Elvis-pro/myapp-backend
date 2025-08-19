const Visitor = require('../models/visitor');

const logVisitorToDB = async (req, res, next) => {
  try {
    await Visitor.create({
      ip: req.ip,
      path: req.originalUrl,
      method: req.method,
      userAgent: req.headers['user-agent'],
    });
  } catch (err) {
    console.error('Visitor log to DB failed:', err.message);
  }
  next();
};

module.exports = logVisitorToDB;
